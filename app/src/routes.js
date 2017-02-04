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
    },
    component: 'home'
  });

  $stateProvider.state({
    name: 'home.collection',
    url: '/collection',
    component: 'collection'
  });

  $stateProvider.state({
    name: 'home.add-game',
    url: '/add-game',
    component: 'addGame'
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

  $urlRouterProvider.when('/home', '/home/collection');
  $urlRouterProvider.otherwise('/');

}