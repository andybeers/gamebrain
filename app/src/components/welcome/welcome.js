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
        this.error = err;
      });
  };

  this.signup = () => {

  };

  this.logout = () => {

  };
}