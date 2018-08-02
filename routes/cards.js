import { Card } from '../models';

export default (router) => {
  router
    .post('cards', '/cards', async (ctx) => {
      const { form } = ctx.request.body;
      console.log(Card);
      const card = Card.build({ ...form, creatorId: ctx.state.userId });
      console.log(card);
      await card.save();
      console.log(card);
      ctx.redirect(router.url('board'));
    })
    .patch('cards', '/cards/:id', async (ctx) => {
      const { form } = ctx.request.body;
      const tag = await Tag.findById(ctx.params.id);
      await tag.update(form);
      ctx.flash.set({ msg: `Tag ${tag.name} has been updated` });
      ctx.redirect(router.url('board'));
    })
    .delete('cards', '/cards/:id', async (ctx) => {
      const tag = await Tag.findById(ctx.params.id);
      console.log(tag);
      await tag.destroy();
      ctx.flash.set({ msg: `Tag ${tag.name} has been deleted` });
      ctx.redirect(router.url('board'));
    });
};
