Router.route('/', function () {
  this.render('appBody');
});

Router.map(function() {
  this.route('welcome');
  this.route('dem');
  this.route('survey');
  this.route('end');
});