import template from './gamenights.html';
import styles from './gamenights.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.tab = 'gamenights';
}