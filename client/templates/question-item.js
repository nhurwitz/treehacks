Template.question.helpers({
  checkedClass: function() {
    return this.checked && 'checked';
  },
  editingClass: function() {
    return Session.equals(EDITING_KEY, this._id) && 'editing';
  }
});

Template.question.events({  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'click #upvote': function(event, template) {
    var str = this.toString();
    var voted = Session.get('voted');
    var upvoted = Session.get('upvoted');
    if(upvoted.length == Math.floor(Object.keys(IDEAS).length/4))
      return;

    if(voted.indexOf(str) == -1) {
      voted.push(str);
      upvoted.push(str);

      Session.set('voted', voted);
      Session.set('upvoted', upvoted);  
    }  
  },
  'click #downvote': function(event, template) {
    var str = this.toString();
    var voted = Session.get('voted');
    var downvoted = Session.get('downvoted');
    if(downvoted.length == Math.floor(Object.keys(IDEAS).length/8))
      return;

    if(voted.indexOf(str) == -1) {
      voted.push(str);
      downvoted.push(str);

      Session.set('voted', voted);
      Session.set('downvoted', downvoted);
    }
  }
});