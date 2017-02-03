routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'welcome',
    url: '/',
    data: {
      public: true
    },
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'users',
    url: '/users/:id',
    abstract: true,
    resolve: {
      current: ['userService', (userService) => {
        return userService.getCurrent();
      }],
      // user: ['userService', '$transition$', 'current', (userService, t, current) => {
      //   if(t.params().id === current._id) {
      //     return current;
      //   } else {
      //     return userService.get(t.params().id);
      //   }
      // }]
    },
    component: 'users'
  });

  $stateProvider.state({
    name: 'users.collection',
    url: '/collection',
    component: 'collection'
  });

  $stateProvider.state({
    name: 'users.friends',
    url: '/friends',
    component: 'friends'
  });

  $stateProvider.state({
    name: 'users.gamenights',
    url: '/gamenights',
    component: 'gamenights'
  });

  $stateProvider.state({
    name: 'add',
    url: '/add',
    resolve: {
      current: ['userService', (userService) => {
        return userService.getCurrent();
      }]
    },
    component: 'addGames'
  });

  $urlRouterProvider.when('users/:id', 'users/:id/collection');
  $urlRouterProvider.otherwise('/');

}