gameService.$inject = ['$http', 'apiUrl'];

export default function gameService($http, apiUrl) {
  return {
    get(game) {
      return $http.get(`${apiUrl}/games/${game}`)
        .then(res => res.data);
    },
    search(query) {
      return $http.get(`${apiUrl}/games?search=${query}`)
        .then(res => res.data);
    },
    searchBgg(query) {
      return $http.get(`${apiUrl}/games/bgg/search/${query}`)
        .then(res => res.data);
    },
    add(bggId) {
      return $http.post(`${apiUrl}/games`, { bggId })
        .then(res => res.data);
    }
  };
}