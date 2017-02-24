import template from './add-friend.html';
import styles from './add-friend.scss';

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

  this.search = () => {
    const query = this.searchInput;

    userService.search(query)
      .then(results => {
        this.results = results;
      })
      .catch(err => {
        console.log(err);
      });
  };

}