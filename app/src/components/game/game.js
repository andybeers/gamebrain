import template from './game.html';
import styles from './game.scss';

export default {
  template,
  bindings: {
    current: '<',
    game: '<',
    owned: '<',
    buttons: '<',
    search: '<',
    bgg: '<',
    gamenight: '='
  },
  controller
};

controller.$inject = ['userService', 'gameService', 'gamenightService', '$state'];

function controller(userService, gameService, gamenightService, $state) {
  this.styles = styles;
  this.expand = false;
  this.overlap = false;

  this.$onInit = () => { 
    if(this.owned) this.overlap = this.owned[this.game._id] ? true : false;
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

  this.addBggGame = bggId => {
    gameService.getByBgg(bggId)
      .then(results => {
        if (results.length !== 0) throw {gameId: results[0]._id};
        return gameService.add(bggId);
      })
      .then(game => {
        this.addGame(game._id);
        $state.go('home.collection');
      })
      .catch(err => {
        if (err.gameId) this.addGame(err.gameId);
        $state.go('home.collection');
      });
  };

  this.rsvp = () => {
    gamenightService.update(this.gamenight._id, {$push: {rsvps: this.game}})
      .then(res => {
        this.gamenight.rsvps = res.rsvps;
      })
      .catch(err => {
        console.log(err);
      });
  };

  this.request = () => {
    gamenightService.update(this.gamenight._id, {$push: {requests: this.game}})
      .then(res => {
        this.gamenight.requests = res.requests;
      })
      .catch(err => {
        console.log(err);
      });
  };

}