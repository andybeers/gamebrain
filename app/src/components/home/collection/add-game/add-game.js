import template from './add-game.html';
import styles from './add-game.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', 'gameService', '$state'];

function controller(userService, gameService, $state) {
  this.styles = styles;
  this.searchResults = false;
  this.bggShow = false;
  this.tab = 'collection';

  this.search = () => {
    const query = this.searchInput;
    if (!query) return;
    
    gameService.search(query)
      .then(results => {
        this.results = results;
        this.searchResults = true;
        this.bggShow = true;
      })
      .catch(err => {
        console.log(err);
      });
  };

  this.addGame = gameId => {
    userService.update(this.current._id, {$addToSet: {gameCollection: gameId}})
      .then(user => {
        this.current.gameCollection = user.gameCollection;
        $state.go('home.collection');
      })
      .catch(err => {
        console.log(err);
      });
  };

  this.bggSearch = () => {
    const query = this.searchInput;
    gameService.searchBgg(query)
      .then(results => {
        this.bggResults = results;
      })
      .catch(err => {
        console.log(err);
      });
  };

  this.addBggGame = bggId => {
    gameService.add(bggId)
      .then(game => {
        this.addGame(game._id);
        $state.go('home.collection');
      })
      .catch(err => {
        console.log(err);
      });
  };

}

