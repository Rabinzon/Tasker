import { Tag, Task, TaskTags } from '../models';

export default (router) => {
  router
    .post('addTagToTask', '/tasks/:id/tags/:tagId', async (ctx) => {
      const { id, tagId } = ctx.params;

      const task = await Task.findById(id);
      const tag = await Tag.findById(tagId);

      const taskTag = await TaskTags.build({ tagId: tag.id, taskId: task.id });
      await taskTag.save();
      ctx.redirect(router.url('board'));
    })

    .delete('removeTagToTask', '/tasks/:id/tags/:tagId', async (ctx) => {
      const { id, tagId } = ctx.params;

      const task = await Task.findById(id);
      const tag = await Tag.findById(tagId);

      await TaskTags.destroy({
        where: { tagId: tag.id, taskId: task.id },
      });
      ctx.redirect(router.url('board'));
    });
};
