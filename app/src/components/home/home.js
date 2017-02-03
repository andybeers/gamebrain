import template from './home.html';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {

  this.$onInit = () => {
    console.log('current: ', this.current);
  };

}