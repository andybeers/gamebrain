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
  this.tab = 'friends';
  this.showResults = false;
  this.emptyResults = false;
  this.validFriend = true;
  this.myself = false;
  this.friended = false;

  this.search = () => {
    this.emptyResults = false;
    this.myself = false;
    this.friended = false;

    const query = this.searchInput;
    if (!query) return;

    userService.search(query)
      .then(results => {
        this.results = results;
        if(results.length === 0) {
          this.emptyResults = true;
        } else {
          this.showResults = true;
          if(results[0]._id === this.current._id) {
            this.validFriend = false;
            this.myself = true;
          } else if (this.current.friends.filter(item => item._id === results[0]._id).length !== 0) {
            this.validFriend = false;
            this.friended = true;
          } else {
            this.validFriend = true;
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  this.add = userId => {
    userService.update(this.current._id, {$addToSet: {friends: userId}})
      .then(user => {
        this.current.friends = user.friends;
        $state.go('home.friends');
      })
      .catch(err => {
        console.log(err);
      });
  };

}