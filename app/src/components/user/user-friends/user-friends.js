import template from './user-friends.html';
import styles from './user-friends.scss';

export default {
  template,
  bindings: {
    current: '<',
    user: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

}