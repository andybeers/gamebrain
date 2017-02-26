import template from './friends.html';
import styles from './friends.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.tab = 'friends';
}