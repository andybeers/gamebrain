userService.$inject = ['$http', 'apiUrl', '$state', 'tokenService'];

export default function userService($http, apiUrl, $state, tokenService) {

  const token = tokenService.get();
  if (token) {
    $http
      .get(`${apiUrl}/auth/validate`)
      .catch(() => tokenService.remove());
  }
    
  function sendCredentials(endpoint) {
    return (credentials) => {
      return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
        .then(res => {
          tokenService.set(res.data.token);
        })
        .catch(err => {
          throw err.data; 
        });
    };
  }

  return {
    isAuthenticated() {
      return !!tokenService.get();
    },
    getCurrent() {
      return $http.get(`${apiUrl}/users/current`)
        .then(res => res.data);
    },
    get(user) {
      return $http.get(`${apiUrl}/users/${user}`)
        .then(res => res.data);
    },
    search(username) {
      return $http.get(`${apiUrl}/users?username=${username}`)
        .then(res => res.data);
    },
    update(user, data) {
      return $http.put(`${apiUrl}/users/${user}`, data)
        .then(res => res.data);
    },
    logout() {
      tokenService.remove();
    },
    signin: sendCredentials('signin'),
    signup: sendCredentials('signup')
  };

}