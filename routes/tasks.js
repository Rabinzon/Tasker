import { Task, User, TaskStatus } from '../models';
import buildFormObj from '../lib/formObjectBuilder';

export default (router) => {
  router
    .post('newTask', '/tasks/new', async (ctx) => {
      const { form } = ctx.request.body;

      form.creatorId = ctx.state.userId;

      const task = await Task.build(form);
      await task.save();

      ctx.redirect(router.url('board'));
    })
    .patch('editTask', '/tasks/:id/edit', async (ctx) => {
      const { form } = ctx.request.body;

      const task = await Task.findById(ctx.params.id);

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
    .get('editTask', '/tasks/:id/edit', async (ctx) => {
      const task = await Task.findById(ctx.params.id);
      const columns = await TaskStatus.findAll();
      const users = await User.findAll();

      ctx.render('task/edit', {
        f: buildFormObj(task),
        taskId: ctx.params.id,
        columns,
        users,
      });
    });
};
