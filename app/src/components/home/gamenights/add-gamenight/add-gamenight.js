import template from './add-gamenight.html';
import styles from './add-gamenight.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

// controller.$inject = ['userService', 'gameService', '$state'];

function controller() {
  this.styles = styles;
  this.tab = 'gamenights';
  this.today = new Date();
  this.date;
  this.update = () => {
    this.dateString = this.date.toString();
  };

  this.create = () => {
    const gamenight = {
      name: this.name,
      description: this.description,
      date: this.date
    };

    
  };
}