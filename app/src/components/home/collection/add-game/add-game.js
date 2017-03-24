import template from './add-game.html';
import styles from './add-game.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', 'gameService'];

function controller(userService, gameService) {
  this.styles = styles;
  this.searchResults = false;
  this.bggShow = false;
  this.emptyBgg = false;
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

  this.bggSearch = () => {
    this.searchResults = false;
    this.emptyBgg = false;
    const query = this.searchInput;
    gameService.searchBgg(query)
      .then(results => {
        if (!results.length) this.emptyBgg = true;
        this.bggResults = results;
      })
      .catch(err => {
        console.log(err);
      });
  };

}

