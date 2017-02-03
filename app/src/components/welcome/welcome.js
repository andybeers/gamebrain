import template from './welcome.html';

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
      .then(user => {
        console.log('user in the welcome', user);
        $state.go('users.collection', {id: user});
      })
      .catch(err => {
        this.loginError = err;
      });
  };

  this.signup = () => {
    this.newCredentials = {
      username: this.newUsername,
      email: this.newEmail,
      password: this.newPassword
    };
    userService.signup(this.newCredentials)
      .then(() => {
        $state.go('users.collection');
      })
      .catch(err => {
        this.signupError = err;
      });
  };

}