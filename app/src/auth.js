export default function auth($transitions) {
  $transitions.onStart({to: state => !state.data === 'public'}, trans => {
    const userService = trans.injector().get('userService');
    if (!userService.isAuthenticated()) {
      return trans.router.stateService.target('welcome');
    }
  });
}