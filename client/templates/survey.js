Session.setDefault('voted', []);

Session.setDefault('upvoted', []);
Session.setDefault('downvoted', []);

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Template.survey.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  questions: function() {
    Session.setDefault('upvotes', Math.floor(Object.keys(IDEAS).length/3));
    Session.setDefault('downvotes', Math.floor(Session.get('upvotes')/2));
    return shuffle(Object.keys(IDEAS));
  },  
  upLeft: function() {
    return Math.floor(Object.keys(IDEAS).length/3) - Session.get('upvoted').length;
  },
  downLeft: function() {
    return Math.floor(Object.keys(IDEAS).length/6) - Session.get('downvoted').length;
  },
});

Template.survey.events({
  'submit': function(event, template) {
    event.preventDefault();  

    if(Session.get('voted').length = 0) {
      //error
    }
    var userVotes = [];
    var upvoted = Session.get('upvoted');
    for(var i = 0; i < upvoted.length; i++) {
      userVotes.push(Vote.insert({
        idea: upvoted[i],
        sentiment: 1
      }));
    }

    var downvoted = Session.get('downvoted');
    for(var i = 0; i < downvoted.length; i++) {
      userVotes.push(Vote.insert({
        idea: downvoted[i],
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