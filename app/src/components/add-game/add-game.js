import template from './add-game.html';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', 'gameService', '$state'];

function controller(userService, gameService, $state) {

  this.searchResults = false;

  this.search = () => {
    const query = this.searchInput;
    gameService.search(query)
      .then(results => {
        console.log('results: ', results);
        this.results = results;
        this.searchResults = true;
      })
      .catch(err => {
        console.log(err);
      });
  };

}

