import template from './gamenights.html';
import styles from './gamenights.scss';

export default {
  template,
  bindings: {
    current: '<',
    hosted: '<',
    invited: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.tab = 'gamenights';

  this.$onInit = () => {
    console.log('invited: ', this.invited);
    console.log('hosted', this.hosted);

    this.hosted.forEach(night => {
      night.datestring = new Date(night.date).toDateString();
    });
  };
}