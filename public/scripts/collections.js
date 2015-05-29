var CohortsCollection = Backbone.Collection.extend({
  model: Cohort,
  url: '/cohorts'
});

var cohorts = new CohortsCollection();

cohorts.fetch()
