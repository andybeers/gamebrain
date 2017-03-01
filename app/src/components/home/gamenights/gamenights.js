import template from './gamenights.html';
import styles from './gamenights.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

controller.$inject = ['gamenightService'];

function controller(gamenightService) {
  this.styles = styles;
  this.tab = 'gamenights';

  this.$onInit = () => {
    gamenightService.hosted()
      .then(res => {
        this.hosted = res;
        this.hosted.forEach(night => {
          night.datestring = new Date(night.date).toDateString();
        });
      })
      .catch(err => {
        console.log(err);
      });

    gamenightService.invited()
      .then(res => {
        this.invited = res;
        this.invited.forEach(night => {
          night.datestring = new Date(night.date).toDateString();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
}