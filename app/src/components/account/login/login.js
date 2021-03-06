import template from './login.html';
import styles from './login.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.styles = styles;

  this.signin = () => {
    this.credentials = {
      username: this.username,
      password: this.password
    };
    userService.signin(this.credentials)
      .then(() => {
        $state.go('home.collection');
      })
      .catch(err => {
        this.loginError = err;
      });
  };

}