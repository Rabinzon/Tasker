import { Task } from '../models';

export default (router) => {
  router
    .patch('assign', '/tasks/:id/assign', async (ctx) => {
      const { form } = ctx.request.body;

      const task = await Task.findById(ctx.params.id);

      await task.update(form);

      ctx.flash.set({ msg: `Task ${task.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('deleteAssignedTo', '/tasks/:id/assign', async (ctx) => {
      const task = await Task.findById(ctx.params.id);
      await task.update({ assignedToId: null });
      ctx.flash.set({ msg: `Task ${task.name} has been updated` });
      ctx.redirect(router.url('board'));
    });
};
