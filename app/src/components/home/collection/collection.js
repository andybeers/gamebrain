import template from './collection.html';
import styles from './collection.scss';

export default {
  template,
  bindings: {
    current: '<'
  },
  controller
};

function controller() {
  this.styles = styles;
  this.tab = 'collection';

  this.$onInit = () => {
    if (this.current.gameCollection.length === 0) this.emptyGames = true;
  };
}