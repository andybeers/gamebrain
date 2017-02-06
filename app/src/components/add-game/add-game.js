import template from './add-game.html';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', 'gameService'];

function controller(userService, gameService) {

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

  this.addGame = game => {
    userService.update(this.current._id, {$push: {gameCollection: game}})
      .then(() => {
        this.current.gameCollection.push(game);
      })
      .catch(err => {
        console.log(err);
      });
  };

}

