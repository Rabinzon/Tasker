import _ from 'lodash';
import { Task, TaskStatus, User, Tag } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

const allowedSearchQueryAttributes = ['assignedToId', 'statusId', 'creatorId'];

export default (router) => {
  router
    .get('board', '/board', async (ctx) => {
      let query = { ...ctx.query };

      if (_.has(query, 'my')) {
        query.creatorId = ctx.state.userId;
      }

      let tagQuery = null;

      if (_.has(query, 'tagId')) {
        tagQuery = {
          id: query.tagId,
        };
      }

      query = _.pick(query, allowedSearchQueryAttributes);

      const tasks = await Task
        .scope({ method: ['default', tagQuery] })
        .findAll({ where: query });

      const users = await User.findAll();
      const tags = await Tag.findAll();
      const taskStatus = TaskStatus.build();
      const columns = await TaskStatus.findAll();

      ctx.render('board/index', {
        f: buildFormObj(taskStatus),
        columns,
        cards: tasks,
        users,
        tags,
        query: ctx.query,
      });
    });
};
