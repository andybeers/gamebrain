import template from './game.html';
import styles from './game.scss';

export default {
  template,
  bindings: {
    game: '<',
    compare: '<',
    owned: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.expand = false;
}