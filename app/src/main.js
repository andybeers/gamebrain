import angular from 'angular';
import components from './components';

const app = angular.module('myApp', [
  components
]);

const dev = 'http://localhost:3000/api';
const url = process.env.API_URL || dev;
app.value('apiUrl', url);