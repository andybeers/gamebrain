gamenightService.$inject = ['$http', 'apiUrl'];

export default function gamenightService($http, apiUrl) {
  return {
    add(gamenight) {
      return $http.post(`${apiUrl}/gamenights`, gamenight)
        .then(res => res.data);
    },
    hosted() {
      return $http.get(`${apiUrl}/gamenights?host=true`)
        .then(res => res.data);
    },
    invited() {
      return $http.get(`${apiUrl}/gamenights?invited=true`)
        .then(res => res.data);
    },
    getById(gamenightId) {
      return $http.get(`${apiUrl}/gamenights/${gamenightId}`)
        .then(res => res.data);
    },
    update(gamenightId, data) {
      return $http.put(`${apiUrl}/gamenights/${gamenightId}`, data)
        .then(res => res.data);
    }
  };
}