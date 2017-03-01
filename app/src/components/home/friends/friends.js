import template from './friends.html';
import styles from './friends.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['userService'];

function controller(userService) {
  this.styles = styles;
  this.tab = 'friends';

  this.remove = friend => {
    userService.update(this.current._id, {$pull: {friends: friend}})
      .then(updated => {
        this.current.friends = updated.friends;
      })
      .catch(err => {
        console.log(err);
      });
  };

}