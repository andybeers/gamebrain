import template from './login.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
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

  this.signup = () => {
    this.newCredentials = {
      username: this.newUsername,
      password: this.newPassword
    };
    userService.signup(this.newCredentials)
      .then(() => {
        $state.go('home.collection');
      })
      .catch(err => {
        this.signupError = err;
      });
  };

}