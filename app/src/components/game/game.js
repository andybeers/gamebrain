import template from './game.html';
import styles from './game.scss';

export default {
  template,
  bindings: {
    game: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
}