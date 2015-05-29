$(document).ready(function(){
var CohortView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#cohort").html()),
  render: function(){

    this.$el.html(this.template({cohort: this.model.toJSON()}));
    return this;
  }
})



var CohortsView = Backbone.View.extend({
  el: "ul#cohort-list",
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function(){
    var cohortList = this.$el;
    cohortList.html("");
    this.collection.each(function(cohort){
      cohortList.append(new CohortView({model: cohort}).render().$el);
    });
    return this;
  }
});

new CohortsView({collection: cohorts}).render()
});
