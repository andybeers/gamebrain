gameService.$inject = ['$http', 'apiUrl'];

export default function gameService($http, apiUrl) {
  return {
    search(query) {
      return $http.get(`${apiUrl}/games?search=${query}`)
        .then(res => res.data);
    },
    add(bggGameId) {
      return $http.get(`${apiUrl}/bggAPI/${bggGameId}`)
        .then(res => res.data);
    }
  };
}