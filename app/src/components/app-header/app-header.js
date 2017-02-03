import template from './app-header.html';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.logout = () => {
    userService.logout();
    $state.go('welcome');
  };
}