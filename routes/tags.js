import { Tag } from '../models';

export default (router) => {
  router
    .post('tags', '/tags', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = Tag.build(form);
      await tag.save();
      ctx.redirect(router.url('board'));
    })
    .patch('pathTag', '/tags/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = await Tag.findById(ctx.params.id);
      await tag.update(form);
      ctx.flash.set({ msg: `Tag ${tag.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('deleteTag', '/tags/:id', async (ctx) => {
      const tag = await Tag.findById(ctx.params.id);
      await tag.destroy();
      ctx.flash.set({ msg: `Tag ${tag.name} has been deleted` });
      ctx.redirect(router.url('board'));
    });
};
