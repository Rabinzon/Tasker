import gravatar from 'gravatar';
import { User } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('newUser', '/users/new', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const { form } = ctx.request.body;
      const avatar = gravatar.url(form.email);
      const userFields = { ...form, avatar };
      const user = User.build(userFields);

      try {
        await user.save();
        ctx.flash.set({ msg: 'User has been created', level: 'success' });
        ctx.redirect(router.url('root'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    })
    .get('user', '/users/:id', async (ctx) => {
      if (!ctx.state.isSignedIn()) {
        ctx.flash.set({ msg: 'Not allowed!' });
        ctx.redirect(router.url('root'));
        return;
      }

      const user = await User.findById(ctx.params.id);
      ctx.render('users/settings', { f: buildFormObj(user), avatar: user.avatar });
    })
    .delete('user', '/users/:id', async (ctx) => {
      const user = await User.findById(ctx.params.id);
      console.log(user);
      await user.destroy();
      ctx.session = {};
      ctx.flash.set({ msg: 'User has been deleted' });
      ctx.redirect(router.url('root'));
    })
    .post('user', '/users/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const user = await User.findById(ctx.params.id);

      try {
        await user.update(form);
        ctx.flash.set({ msg: 'User has been updated', level: 'success' });
        ctx.redirect(router.url('root'));
      } catch (e) {
        console.log(e);
      }
    });
};
