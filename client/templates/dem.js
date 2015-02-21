var ERRORS_KEY = 'newCourseErrors';

Template.dem.created = function() {
  Session.set(ERRORS_KEY, {});
};


Template.dem.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
});

Template.dem.events({
  'submit': function(event, template) {
    event.preventDefault();

    var age = template.$('[name=age]').val();
    var language = template.$('[name=language]').val();

    var errors = {};

    if(! age) {
      errors.courseName = "Age Required";
    }

    if(! language) {
      errors.department = "Language Required";
    }

    if (isNaN(age)) {
      errors.courseNumber = 'Age must be a number';
    } else {
      age = parseInt(age);
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
  },
  'click .js-back-button': function() {
    
  }
});