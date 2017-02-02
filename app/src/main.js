import angular from 'angular';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import http from './http';
import routes from './routes';

const app = angular.module('myApp', [
  components,
  services,
  uiRouter
]);

const dev = 'http://localhost:3000/api';
const url = process.env.API_URL || dev;
app.value('apiUrl', url);

app.config(http);
app.config(routes);