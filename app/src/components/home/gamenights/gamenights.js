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
  this.emptyHost = false;
  this.emptyInvite = false;

  this.$onInit = () => {
    gamenightService.hosted()
      .then(res => {
        this.hosted = res;
        if (this.hosted.length === 0) this.emptyHost = true;
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
        if (this.invited.length === 0) this.emptyInvite = true;
        this.invited.forEach(night => {
          night.datestring = new Date(night.date).toDateString();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
}