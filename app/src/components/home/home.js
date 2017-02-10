import template from './home.html';
import styles from './home.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.tab = 'collection';

  this.$onInit = () => {
    console.log('current: ', this.current);
  };

}