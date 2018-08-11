import { Task, TaskStatus, User, Tag } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .get('board', '/board', async (ctx) => {
      const users = await User.findAll();
      const tags = await Tag.findAll();
      const tasks = await Task.findAll({
        include: [{
          model: User,
          as: 'creator',
        }, {
          model: User,
          as: 'assignedTo',
        }, {
          model: TaskStatus,
          as: 'status',
        }, {
          model: Tag,
        }],
      });

      const taskStatus = TaskStatus.build();
      const columns = await TaskStatus.findAll();
      ctx.render('board/index', {
        f: buildFormObj(taskStatus),
        columns,
        cards: tasks,
        users,
        tags,
      });
    });
};
