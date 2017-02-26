import template from './gamenights.html';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.tab = 'gamenights';
}