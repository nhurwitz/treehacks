Router.configure({

});

Router.route('/', function () {
  this.render('appBody');
});

Router.map(function() {
  this.route('welcome');
  this.route('dem');
  this.route('survey');
});


Router.route('end', {
  // this template will be rendered until the subscriptions are ready
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('voters');
  },

  action: function () {
    this.render();
  }
});