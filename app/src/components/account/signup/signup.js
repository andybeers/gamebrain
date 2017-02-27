import template from './signup.html';
import styles from './signup.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.styles = styles;

  this.signup = () => {
    this.credentials = {
      username: this.username,
      password: this.password
    };
    userService.signup(this.credentials)
      .then(() => {
        $state.go('home.collection');
      })
      .catch(err => {
        this.signupError = err;
      });
  };
}