import { TaskStatus } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .get('board', '/board', async (ctx) => {
      const taskStatus = TaskStatus.build();
      const columns = await TaskStatus.findAll();
      ctx.render('board/index', { f: buildFormObj(taskStatus), columns });
    });
};
