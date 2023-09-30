function loginModalToggleDisable(form, disabled = true) {
  const formChildren = form.elements;
  for (let formChild of formChildren) {
    if (
      formChild.getAttribute('id') === 'loginButton' ||
      formChild.getAttribute('id') === 'signUpButton'
    ) {
      let loadingSpan = formChild.firstElementChild;
      let textSpan = formChild.children.item(1);

      if (disabled) {
        loadingSpan.setAttribute('class', 'spinner-border spinner-border-sm');
        textSpan.textContent =
          formChild.getAttribute('id') === 'loginButton'
            ? 'Logging in...'
            : 'Signing up...';
      } else {
        loadingSpan.setAttribute('class', '');
        textSpan.textContent =
          formChild.getAttribute('id') === 'loginButton' ? 'Login' : 'Sign Up';
      }
    }
    formChild.disabled = disabled ? true : false;
  }
}

function loginModalError(
  form,
  message = 'error encountered',
  disabled = false,
  success = false
) {
  const modalBody = form.getElementsByClassName('modal-body')[0];
  let errorDiv;
  if (disabled) {
    errorDiv = modalBody.getElementsByClassName('alert-danger')[0];
    if (errorDiv) {
      modalBody.removeChild(errorDiv);
    }
  } else {
    errorDiv = modalBody.getElementsByClassName('alert-danger')[0];
    if (errorDiv) {
      modalBody.removeChild(errorDiv);
    }
    errorDiv = document.createElement('div');
    if (success) {
      errorDiv.setAttribute('class', 'alert alert-success');
    } else {
      errorDiv.setAttribute('class', 'alert alert-danger');
    }
    errorDiv.setAttribute('role', 'alert');
    errorDiv.textContent = message;
    modalBody.appendChild(errorDiv);
  }
}

async function login(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const body = JSON.stringify({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  loginModalError(event.target, '', true);
  loginModalToggleDisable(event.target);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  };

  const response = await fetch(`${APP_URL}/api/auth/login`, options);
  const responseJson = await response.json();

  setTimeout(() => {
    loginModalToggleDisable(event.target, false);
    if (response.status !== 200) {
      loginModalError(event.target, responseJson.message);
    } else {
      localStorage.setItem('access-token', responseJson.token);
      location.reload();
    }
  }, 1000);
}

document.getElementById('loginForm').addEventListener('submit', login);

async function logout(event) {
  event.preventDefault();

  const access_token = localStorage.getItem('access-token');

  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(`${APP_URL}/api/auth/logout`, options);
  if (response.status === 200) {
    localStorage.removeItem('access-token');
    location.reload();
  }
}

document.getElementById('logoutForm')?.addEventListener('submit', logout);

async function signup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const body = JSON.stringify({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    username: formData.get('username'),
  });

  loginModalError(event.target, '', true);
  loginModalToggleDisable(event.target);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  };

  const response = await fetch(`${APP_URL}/api/auth/register`, options);
  const responseJson = await response.json();

  setTimeout(() => {
    loginModalToggleDisable(event.target, false);
    if (response.status !== 200) {
      loginModalError(event.target, responseJson.message);
    } else {
      loginModalError(event.target, responseJson.message, false, true);
    }
  }, 1000);
}

document.getElementById('signUpForm').addEventListener('submit', signup);

async function citySelect(event) {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;

  const { id, lat, lon } = JSON.parse(event.target.value);
  const coords = {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
  };
  map.setCenter(coords);
  setInfoWindow(coords.lat, coords.lng);
}

async function countrySelect(event) {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;
  const citySelectElement = document.getElementById('citySelect');
  citySelectElement.innerHTML = '';
  citySelectElement.disabled = false;
  citySelectElement.addEventListener('change', citySelect);

  const country = event.target.value;

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(`${APP_URL}/api/cities/${country}`, options);
  const cities = await response.json();

  for (let city of cities) {
    let option = document.createElement('option');
    option.textContent = city.cityName;
    option.value = JSON.stringify({
      id: city.id,
      lat: city.lat,
      lon: city.lon,
    });
    citySelectElement.appendChild(option);
  }
  citySelectElement.value = cities[0].city;
}

async function populateCountry(event) {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(`${APP_URL}/api/countries`, options);
  const countries = await response.json();
  const countrySelectElement = document.getElementById('countrySelect');

  for (let country of countries) {
    let option = document.createElement('option');
    option.textContent = country.name;
    option.value = country.code;
    countrySelectElement.appendChild(option);
  }
}

async function populateBookmarks() {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;

  const bookmarksElement = document.querySelector('#tw-bookmarks .list-group');

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };

  const response = await fetch(`${APP_URL}/api/bookmarks`, options);
  const bookmarksJSON = await response.json();

  for (let bookmark of bookmarksJSON) {
    const { lat, lon, name } = bookmark;
    const childNode = document.createElement('li');
    childNode.setAttribute(
      'class',
      'list-group-item d-flex justify-content-between align-items-center'
    );

    // get weather info for the weather image and temp
    const weatherInfo = await getWeatherData(lat, lon);
    const weather = weatherInfo.weather[0];

    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('class', 'me-auto');
    nameSpan.textContent = weatherInfo.name;

    const img = document.createElement('img');
    img.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${weather.icon}.png`
    );

    const tempSpan = document.createElement('span');
    tempSpan.setAttribute('style', 'padding-right: 10px');
    tempSpan.innerHTML = `${weatherInfo.main.temp}&deg;C`;

    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'tw-bookmark-delete btn-close');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('value', bookmark.id);
    closeButton.setAttribute('onclick', 'deleteBookmark(this)');

    childNode.appendChild(nameSpan);
    childNode.appendChild(img);
    childNode.appendChild(tempSpan);
    childNode.appendChild(closeButton);

    bookmarksElement.appendChild(childNode);
  }
}

async function createBookmark(event) {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;
  const body = JSON.parse(event.value);

  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${access_token}`,
      'content-type': `application/json`,
    },
    body: JSON.stringify(body),
  };

  let response = await fetch(`${APP_URL}/api/bookmarks/create`, options);
  response = await response.json();

  alert(response.message);
  location.reload();
}

async function deleteBookmark(event) {
  const access_token = localStorage.getItem('access-token');
  if (!access_token) return;

  const id = event.value;

  const options = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };

  let response = await fetch(`${APP_URL}/api/bookmarks/delete/${id}`, options);
  response = await response.json();

  if (response.statusCode === 200) {
    alert(response.message);
    event.parentElement.remove();
  }
}

if (
  localStorage.getItem('access-token') &&
  document.getElementById('countrySelect')
) {
  document.addEventListener('DOMContentLoaded', populateCountry);
  document
    .getElementById('countrySelect')
    .addEventListener('change', countrySelect);
}

if (
  localStorage.getItem('access-token') &&
  document.getElementById('tw-bookmarks')
) {
  document.addEventListener('DOMContentLoaded', populateBookmarks);

  const bookmarksDeleteButton =
    document.getElementsByClassName('tw-bookmark-delete');
  if (bookmarksDeleteButton.length > 0) {
    for (let bookmark of bookmarksDeleteButton) {
      bookmark.addEventListener('click', deleteBookmark);
    }
  }
}
