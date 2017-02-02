import angular from 'angular';
import camelcase from 'camelcase';
import path from 'path';

const context = require.context(
  './',
  true,
  /^\.\/(?!index).+?\.js$/
);

const module = angular.module('services', []);

context.keys().forEach(key => {
  const name = camelcase(path.basename(key, '.js'));
  module.factory(name, context(key).default);
});

export default module.name;