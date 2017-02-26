import template from './add-gamenight.html';
import styles from './add-gamenight.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

// controller.$inject = ['userService', 'gameService', '$state'];

function controller() {
  this.styles = styles;
  this.tab = 'gamenights';
}