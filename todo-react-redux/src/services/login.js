import Utils from '../utils/utils';
const utils = new Utils();

export const LoginService = {
  login,
  logout,
  checkLogin,
};

async function login(username, password) {
  const requestOptions = {
    crossDomain:true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  };
  return await fetch(`http://localhost:3000/login`, requestOptions)

    .then(response => {

      if (response.ok) {
        console.log("2nd", response);
        if (response.status === 200) {

          console.log(response);
          sessionStorage.setItem('user', 'JSON.stringify(user)');
          return response;
        }
      }
    });
}

function logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem('user');
}


function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();

      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function checkLogin() {
  return utils.getLoginSession();
}