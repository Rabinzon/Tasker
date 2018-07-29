import { TaskStatus } from '../models';

export default (router) => {
  router
    .post('column', '/column', async (ctx) => {
      const { form } = ctx.request.body;
      const taskStatus = TaskStatus.build(form);
      await taskStatus.save();
      ctx.redirect(router.url('board'));
    })
    .patch('editColumn', '/column/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const taskStatus = await TaskStatus.findById(ctx.params.id);
      await taskStatus.update(form);
      ctx.redirect(router.url('board'));
    })
    .delete('deleteColumn', '/column/:id', async (ctx) => {
      const taskStatus = await TaskStatus.findById(ctx.params.id);
      console.log(taskStatus);
      await taskStatus.destroy();
      ctx.flash.set({ msg: `Column ${taskStatus.name} has been deleted` });
      ctx.redirect(router.url('board'));
    });
};
