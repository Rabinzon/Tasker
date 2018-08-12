import _ from 'lodash';
import { Task, TaskStatus, User, TaskTags, Tag } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

const allowedSearchQueryAttributes = ['assignedToId', 'statusId'];
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
          where: tagQuery
        }],
        where: query,
      });
  
      console.log(tasks);
  
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
