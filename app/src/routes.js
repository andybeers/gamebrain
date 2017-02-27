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
    name: 'signup',
    url: '/signup',
    data: {
      public: true
    },
    component: 'signup'
  });

  $stateProvider.state({
    name: 'home',
    url: '/home',
    abstract: true,
    resolve: {
      current: ['userService', userService => {
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
    name: 'home.add-friend',
    url: '/add-friend',
    component: 'addFriend'
  });

  $stateProvider.state({
    name: 'home.gamenights',
    url: '/gamenights',
    component: 'gamenights'
  });

  $stateProvider.state({
    name: 'home.add-gamenight',
    url: '/create-gamenight',
    component: 'addGamenight'
  });

  $stateProvider.state({
    name: 'user',
    url: '/user/:id',
    abstract: true,
    resolve: {
      current: ['userService', userService => {
        return userService.getCurrent();
      }],
      user: ['current', 'userService', '$transition$', (current, userService, t) => {
        return userService.get(t.params().id);
      }],
      myself: ['current', 'user', (current, user) => {
        return current._id === user._id ? true : false;
      }],
      friended: ['current', 'user', (current, user) => {
        return current.friends.filter(friend => friend._id === user._id).length !== 0 ? true : false;
      }]
    },
    component: 'user'
  });

  $stateProvider.state({
    name: 'user.collection',
    url: '/collection',
    component: 'userCollection'
  });

  $stateProvider.state({
    name: 'user.friends',
    url: '/friends',
    component: 'userFriends'
  });

  $urlRouterProvider.when('/home', '/home/collection');
  $urlRouterProvider.when('/user', '/home/friends');
  $urlRouterProvider.otherwise('/');

}