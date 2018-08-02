import { TaskStatus } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router.get('root', '/', (ctx) => {
    if (ctx.state.isSignedIn()) {
      const taskStatus = TaskStatus.build();
      ctx.render('board/index', { f: buildFormObj(taskStatus) });

      return;
    }

    ctx.render('welcome/index');
  });
};
