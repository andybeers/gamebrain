import template from './app.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {

  this.$onInit = () => {
    if (userService.isAuthenticated()) $state.go('users');
  };

}