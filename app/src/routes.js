routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'welcome',
    url: '/',
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'users',
    url: '/users',
    resolve: {
      current: ['userService', (userService) => {
        return userService.getCurrent();
      }]
    },
    component: 'users'
  });

  $stateProvider.state({
    name: 'add',
    url: '/add',
    component: 'add-games'
  });

  $urlRouterProvider.otherwise('/');

}