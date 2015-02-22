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

    var errors = {};

    if(!age) {
      errors.age = "Age Required";
    }

    if(isNan(age)) {
      errors.age = "Invalid Age";
    } else {
      age = parseInt(age);
    }

    if(age < 0 || age > 100) {
      errors.age = "Invalid Age";
    }

    if(!gender) {
      errors.gender = "Gender Required";
    }

    if(!language) {
      errors.language = "First Language Required";
    }

    Session.set(ERRORS_KEY, errors);
    if(_.keys(errors).length) {
      return;
    }

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
