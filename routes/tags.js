import { Tag } from '../models';

export default (router) => {
  router
    .post('tag', '/tag', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = Tag.build(form);
      await tag.save();
      ctx.redirect(router.url('board'));
    })
    .patch('tag', '/tag/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = await Tag.findById(ctx.params.id);
      await tag.update(form);
      ctx.flash.set({ msg: `Tag ${tag.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('tag', '/tag/:id', async (ctx) => {
      const tag = await Tag.findById(ctx.params.id);
      console.log(tag);
      await tag.destroy();
      ctx.flash.set({ msg: `Tag ${tag.name} has been deleted` });
      ctx.redirect(router.url('board'));
    });
};
