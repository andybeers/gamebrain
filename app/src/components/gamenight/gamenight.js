import template from './gamenight.html';
import styles from './gamenight.scss';

export default {
  template,
  bindings: {
    current: '<',
    gamenight: '<'
  },
  controller
};

controller.$inject = ['gamenightService'];

function controller(gamenightService) {
  this.styles = styles;
  this.tab = 'gamenights';

  this.$onInit = () => {
    console.log('gamenight current', this.current);
    console.log('gamenight', this.gamenight);
  };

  this.invite = friend => {
    console.log('inviting: ', friend);
    gamenightService.update(this.gamenight._id, {$addToSet: {invites: friend}})
      .then(gamenight => {
        this.gamenight.invites = gamenight.invites;
        console.log('new gamenight: ', this.gamenight);
      })
      .catch(err => {
        console.log(err);
      });
  };
}