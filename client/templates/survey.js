Session.setDefault('voted', []);


Template.survey.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  langOptions: function () {
    return [
      {
        optgroup: "First Language",
        options: [
          {label: "English", value: "English"},
          {label: "Hebrew", value: "Hebrew"},
          {label: "Arabic", value: "Arabic"}
        ]
      }
    ];
  },
  questions: function() {
    var q = Questions.find({});
    Session.setDefault('upvotes', Math.floor(Questions.find({}).count()/4));
    Session.setDefault('downvotes', Math.floor(Session.get('upvotes')/2));
    return q;
  },  
  upLeft: function() {
    return Session.get('upvotes');
  },
  downLeft: function() {
    return Session.get('downvotes');
  },
});

Template.survey.events({
  'submit': function(event, template) {
    event.preventDefault();  
    var age = template.$('[name=age]').val();
    var language = template.$('[name=language]').val();

    var demo = {
      'age': age,
      'langage': language
    };

    Session.set('demographic', demo);

    Router.go('survey');
  },
  'reset': function(event, template) {
    Session.set('upvotes', Math.floor(Questions.find({}).count()/4));
    Session.set('downvotes', Math.floor(Session.get('upvotes')/2));
    Session.set('voted', []);
  }
});
