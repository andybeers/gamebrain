import template from './welcome.html';
import styles from './welcome.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.styles = styles;

  this.$onInit = () => {
    if(userService.isAuthenticated()) $state.go('home.collection');
  };
}