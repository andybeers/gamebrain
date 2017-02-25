import template from './user.html';
import styles from './user.scss';

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