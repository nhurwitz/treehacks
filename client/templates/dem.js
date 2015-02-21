var ERRORS_KEY = 'newCourseErrors';

Template.dem.created = function() {
  Session.set(ERRORS_KEY, {});
};

Schemas.Demographics = new SimpleSchema({
  language: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  }
});


Template.dem.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  langOptions: function () {
    return [
     {label: "English", value: "English"},
     {label: "Hebrew", value: "Hebrew"},
     {label: "Arabic", value: "Arabic"}
    ];
  },
  genderOptions: function() {
    return [
      {label: "Female", value: "Female"},
      {label: "Male", value: "Male"}
    ];
  }
});

Template.dem.events({
  'submit': function(event, template) {
    event.preventDefault();  
    var age = template.$('[name=age]').val();
    var language = template.$('[name=language]').val();
    var gender = template.$('[name=gender]').val();


   var id = Voter.insert({
      'age': age,
      'langage': language,
      'gender': gender,
      'votes': []
    });
 
   Session.set('userid', id);
   Router.go('survey');
  }
});
