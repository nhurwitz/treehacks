Session.setDefault('voted', []);

Session.setDefault('upvoted', []);
Session.setDefault('downvoted', []);

Template.survey.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  questions: function() {
    Session.setDefault('upvotes', Math.floor(Object.keys(IDEAS).length/4));
    Session.setDefault('downvotes', Math.floor(Session.get('upvotes')/2));
    return Object.keys(IDEAS);
  },  
  upLeft: function() {
    return Math.floor(Object.keys(IDEAS).length/4) - Session.get('upvoted').length;
  },
  downLeft: function() {
    return Math.floor(Object.keys(IDEAS).length/8) - Session.get('downvoted').length
  },
});

Template.survey.events({
  'submit': function(event, template) {
    event.preventDefault();  

    if(Session.get('voted').length = 0) {
      //error
    }
    var userVotes = [];
    for(var v in Session.get('upvoted')) {
      userVotes.push(Vote.insert({
        idea: v,
        sentiment: 1
      }));
    }

    for(var v in Session.get('downvoted')) {
      userVotes.push(Vote.insert({
        idea: v,
        sentiment: 0
      }));
    }

    Voter.update(Session.get('userid'), {$set: {votes: userVotes}});

    Router.go('end');
  },
  'reset': function(event, template) {
    Session.set('voted', []);
    Session.set('upvoted', []);
    Session.set('downvoted', []);
  }
});