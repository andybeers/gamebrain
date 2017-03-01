import template from './game.html';
import styles from './game.scss';

export default {
  template,
  bindings: {
    game: '<',
    owned: '<',
    buttons: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.expand = false;
  this.overlap = false;

  this.$onInit = () => {
    if(this.owned) this.overlap = this.owned[this.game._id] ? true : false;
  };

}