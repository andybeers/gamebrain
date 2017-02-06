import template from './app-header.html';
import styles from './app-header.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.styles = styles;
  
  this.logout = () => {
    userService.logout();
    $state.go('welcome');
  };
}