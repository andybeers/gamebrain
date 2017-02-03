import template from './welcome.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.signin = () => {
    console.log('in signin function');
    this.credentials = {
      username: this.username,
      password: this.password
    };
    userService.signin(this.credentials)
      .then(() => {
        $state.go('users');
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
        $state.go('users');
      })
      .catch(err => {
        this.signupError = err;
      });
  };

}