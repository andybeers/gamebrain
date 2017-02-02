routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/',
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'users',
    url: '/users',
    component: 'users'
  });

  $stateProvider.state({
    name: 'add',
    url: '/add',
    component: 'add-games'
  });

  $urlRouterProvider.otherwise('/');

}