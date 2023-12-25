hexo.extend.helper.register('serialize_i18n', function () {
  const localizationData = {
    "tip-status-done": this.__('tip-status-done'),
    "tip-status-default": this.__('tip-status-default'),
    "tip-status-todo": this.__('tip-status-todo'),
    "tip-status-doing": this.__('tip-status-doing'),
    "tip-status-other": this.__('tip-status-other'),

    "January": this.__('January'),
    "February": this.__('February'),
    "March": this.__('March'),
    "April": this.__('April'),
    "May": this.__('May'),
    "June": this.__('June'),
    "July": this.__('July'),
    "August": this.__('August'),
    "September": this.__('September'),
    "October": this.__('October'),
    "November": this.__('November'),
    "December": this.__('December')
  };
  return `<script>window.i18n = ${JSON.stringify(localizationData)}</script>`;
});
