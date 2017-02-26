import template from './game.html';
import styles from './game.scss';

export default {
  template,
  bindings: {
    game: '<',
    owned: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.overlap = () => {
    return this.owned[this.game._id];
  };

  this.expand = false;

  this.$onInit = () => {
    if(this.owned) this.overlap = this.owned[this.game._id] ? true : false;
  };

}