import buildFormObj from '../lib/formObjectBuilder';
import { encrypt } from '../lib/secure';
import { User } from '../models';

export default (router) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      ctx.render('sessions/new', { f: buildFormObj(data) });
    })
    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body.form;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.passwordDigest === encrypt(password)) {
        ctx.session.userId = user.id;
        ctx.session.userAvatar = user.avatar;
        ctx.redirect(router.url('root'));
        return;
      }

      ctx.render('sessions/new', {
        f: buildFormObj({ email }),
        error: {
          msg: 'email or password were wrong',
          level: 'danger',
        },
      });
    })
    .delete('session', '/session', (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};

