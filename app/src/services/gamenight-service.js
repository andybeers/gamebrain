gamenightService.$inject = ['$http', 'apiUrl'];

export default function gamenightService($http, apiUrl) {
  return {
    add(gamenight) {
      return $http.post(`${apiUrl}/gamenights`, gamenight)
        .then(res => res.data);
    }
  };
}