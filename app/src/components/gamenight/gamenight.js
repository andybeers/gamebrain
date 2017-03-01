import template from './gamenight.html';
import styles from './gamenight.scss';

export default {
  template,
  bindings: {
    current: '<',
    gamenight: '<',
    host: '<',
    allGames: '<'
  },
  controller
};

controller.$inject = ['gamenightService'];

function controller(gamenightService) {
  this.styles = styles;
  this.tab = 'gamenights';
  this.showFriends = false;

  this.$onInit = () => {
    console.log('full night:', this.gamenight);
    console.log('allgames: ', this.allGames);

    this.datestring = new Date(this.gamenight.date).toDateString();

    this.myGameHash = this.current.gameCollection.reduce((acc, curr) => {
      acc[curr._id] = true;
      return acc;
    }, {});

    this.invitedHash = this.gamenight.invites.reduce((acc, curr) => {
      acc[curr._id] = true;
      return acc;
    }, {});

    this.filter = friend => !this.invitedHash[friend._id];

    this.checkOwned();
  };

  this.checkOwned = () => {
    this.ownedHash = this.allGames.reduce((acc, curr) => {
      if(this.myGameHash[curr._id]) acc[curr._id] = true;
      return acc;
    }, {});
  };

  this.toggle = () => {
    this.showFriends = !this.showFriends;
  };

  this.invite = friend => {
    gamenightService.update(this.gamenight._id, {$addToSet: {invites: friend}})
      .then(gamenight => {
        this.invitedHash[friend._id] = true;
        this.gamenight.invites = gamenight.invites;
      })
      .catch(err => {
        console.log(err);
      });
  };
}