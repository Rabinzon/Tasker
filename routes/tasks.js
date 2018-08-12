import { Task, User, TaskStatus, Tag, TaskTags } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .post('tasks', '/tasks', async (ctx) => {
      const { form } = ctx.request.body;
      form.creatorId = ctx.state.userId;

      if (!form.statusId) {
        form.statusId = 1;
      }
      const card = await Task.build(form);
      await card.save();

      ctx.redirect(router.url('board'));
    })
    .patch('editTask', '/task/:id/edit', async (ctx) => {
      const { form } = ctx.request.body;

      const task = await Task.findById(ctx.params.id);
      if (form.assignedToId === 'default') {
        form.assignedToId = null;
      }
      await task.update(form);

      ctx.flash.set({ msg: `Task ${task.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('deleteTask', '/tasks/:id', async (ctx) => {
      const task = await Task.findById(ctx.params.id);
      await task.destroy();
      ctx.flash.set({ msg: `Task ${task.name} has been deleted` });
      ctx.redirect(router.url('board'));
    })
    .get('editTask', '/task/:id/edit', async (ctx) => {
      const task = await Task.findById(ctx.params.id);
      const columns = await TaskStatus.findAll();
      const users = await User.findAll();
      ctx.render('task/edit', {
        f: buildFormObj(task), taskId: ctx.params.id, columns, users,
      });
    })
    .post('addTagToTask', '/task/:id/tag', async (ctx) => {
      const { form } = ctx.request.body;

      const task = await Task.findById(ctx.params.id);
      const tag = await Tag.findById(form.tagId);

      const taskTag = await TaskTags.build({ tagId: tag.id, taskId: task.id });
      await taskTag.save();
      console.log(taskTag);

      ctx.redirect(router.url('board'));
    })

    .delete('removeTagToTask', '/task/:id/tag', async (ctx) => {
      const { form } = ctx.request.body;
      console.log(form);
      const task = await Task.findById(ctx.params.id);
      const tag = await Tag.findById(form.tagId);

      const taskTag = await TaskTags.findOne({
        where: { tagId: tag.id, taskId: task.id },
      });
      console.log(taskTag);
      await TaskTags.destroy({
        where: { tagId: tag.id, taskId: task.id },
      });
      ctx.redirect(router.url('board'));
    });
};
