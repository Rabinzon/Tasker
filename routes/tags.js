import { Tag } from '../models';

export default (router) => {
  router
    .post('tag', '/tag', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = Tag.build(form);
      await tag.save();
      console.log(tag);
      ctx.redirect(router.url('board'));
    })
    .patch('pathTag', '/tag/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = await Tag.findById(ctx.params.id);
      await tag.update(form);
      ctx.flash.set({ msg: `Tag ${tag.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('deleteTag', '/tag/:id', async (ctx) => {
      const tag = await Tag.findById(ctx.params.id);
      await tag.destroy();
      ctx.flash.set({ msg: `Tag ${tag.name} has been deleted` });
      ctx.redirect(router.url('board'));
    });
};
