export default (router) => {
  router.get('root', '/', (ctx) => {
    if (ctx.state.isSignedIn()) {
      ctx.redirect('board');
      return;
    }

    ctx.render('welcome/index');
  });
};
