import template from './users.html';

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