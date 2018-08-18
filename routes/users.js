import gravatar from 'gravatar';
import { User } from '../models';
import { buildFormObj, maxUsersLimit } from '../lib/';

export default (router) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll({ limit: maxUsersLimit });
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
    });
};
