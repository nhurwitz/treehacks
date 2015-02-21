Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'home',
});

Router.map(function() {
  this.route('home');
  this.route('poll');
});