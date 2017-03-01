import template from './gamenight.html';
import styles from './gamenight.scss';

export default {
  template,
  bindings: {
    current: '<',
    gamenight: '<',
    host: '<'
  },
  controller
};

controller.$inject = ['gamenightService'];

function controller(gamenightService) {
  this.styles = styles;
  this.tab = 'gamenights';
  this.showFriends = false;

  this.$onInit = () => {
    this.gatherGames();
    this.removeDupes();

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

  this.gatherGames = () => {
    const invitedGames = this.gamenight.invites.reduce((acc, curr) => {
      if(curr.gameCollection.length > 0) return acc.concat(curr.gameCollection);
      return acc;
    }, []);
    this.allGames = this.gamenight.host.gameCollection.length > 0 ? invitedGames.concat(this.gamenight.host.gameCollection) : invitedGames;
  };

  this.checkOwned = () => {
    this.ownedHash = this.allGames.reduce((acc, curr) => {
      if(this.myGameHash[curr._id]) acc[curr._id] = true;
      return acc;
    }, {});
  };

  this.removeDupes = () => {
    this.uniques = this.allGames.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj._id).indexOf(obj._id) === pos;
    });
  };

  this.toggle = () => {
    this.showFriends = !this.showFriends;
  };

  this.invite = friend => {
    gamenightService.update(this.gamenight._id, {$addToSet: {invites: friend}})
      .then(gamenight => {
        this.invitedHash[friend._id] = true;
        this.gamenight.invites = gamenight.invites;
        this.gatherGames();
        this.removeDupes();
      })
      .catch(err => {
        console.log(err);
      });
  };
}