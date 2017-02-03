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
    name: 'login',
    url: '/login',
    data: {
      public: true
    },
    component: 'login'
  });

  $stateProvider.state({
    name: 'home',
    url: '/home',
    abstract: true,
    resolve: {
      current: ['userService', (userService) => {
        return userService.getCurrent();
      }]
      // user: ['userService', '$transition$', 'current', (userService, t, current) => {
      //   if(t.params().id === current._id) {
      //     return current;
      //   } else {
      //     return userService.get(t.params().id);
      //   }
      // }]
    },
    component: 'home'
  });

  $stateProvider.state({
    name: 'home.collection',
    url: '/collection',
    component: 'collection'
  });

  $stateProvider.state({
    name: 'home.friends',
    url: '/friends',
    component: 'friends'
  });

  $stateProvider.state({
    name: 'home.gamenights',
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

  $urlRouterProvider.when('/home', '/home/collection');
  $urlRouterProvider.otherwise('/');

}