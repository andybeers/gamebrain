import template from './user-collection.html';
import styles from './user-collection.scss';

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

  this.compare = true;
}