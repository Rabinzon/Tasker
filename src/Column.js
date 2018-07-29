import $ from 'jquery';

export default class {
  constructor(options) {
    const defaults = {
      el: '.js-title',
      dom: {
        title: 'h4',
        form: '.js-title-edit-form',
        editBtn: '.js-title-edit-btn',
      },
      classes: {
        displayNone: 'd-none',
      },
    };

    this.options = $.extend(true, {}, defaults, options);
    this.elems = [];
    this.$el = $(this.options.el);
    return this;
  }

  get() {
    const {
      title, form, editBtn,
    } = this.options.dom;

    this.elems = [...this.$el].map((elem) => {
      const $el = $(elem);
      return {
        $el,
        $editBtn: $el.find(editBtn),
        $form: $el.find(form),
        $title: $el.find(title),
      };
    });

    return this;
  }

  handleClick(block) {
    const { $form, $title } = block;
    const { classes: { displayNone } } = this.options;
    $form.toggleClass(displayNone);
    $title.toggleClass(displayNone);
  }

  init() {
    this.elems.forEach((block) => {
      block.$editBtn.on('click', () => this.handleClick(block));
    });

    return this;
  }

  render() {
    if (this.$el.length) {
      this
        .get()
        .init();
    }
  }
}
