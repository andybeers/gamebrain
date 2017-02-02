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
    getCurrent() {
      return $http.get(`${apiUrl}/users/current`)
        .then(res => res.data);
    },
    get(user) {
      return $http.get(`${apiUrl}/users/${user}`)
        .then(res => res.data);
    },
    isAuthenticated() {
      return !!tokenService.get();
    },
    logout() {
      tokenService.remove();
    },
    signin: sendCredentials('signin'),
    signup: sendCredentials('signup')
  };

}