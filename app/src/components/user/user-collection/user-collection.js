import template from './user-collection.html';
import styles from './user-collection.scss';

export default {
  template,
  bindings: {
    current: '<',
    user: '<',
    myself: '<',
    friended: '<'
  },
  controller
};

function controller() {
  this.styles = styles;

  this.compare = true;

  this.$onInit = () => {
    this.myGameHash = this.current.gameCollection.reduce((acc, curr) => {
      acc[curr._id] = true;
      return acc;
    }, {});
    
    this.ownedHash = this.user.gameCollection.reduce((acc, curr) => {
      if(this.myGameHash[curr._id]) acc[curr._id] = true;
      return acc;
    }, {});

  };
}