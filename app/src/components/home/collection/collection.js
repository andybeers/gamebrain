import template from './collection.html';
import styles from './collection.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

}