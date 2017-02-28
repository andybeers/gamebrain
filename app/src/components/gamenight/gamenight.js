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
  this.toggle = false;

  this.$onInit = () => {
    console.log(this.host);
    this.datestring = new Date(this.gamenight.date).toDateString();
  };

  this.invite = friend => {
    console.log('inviting: ', friend);
    gamenightService.update(this.gamenight._id, {$addToSet: {invites: friend}})
      .then(gamenight => {
        this.gamenight.invites = gamenight.invites;
      })
      .catch(err => {
        console.log(err);
      });
  };
}