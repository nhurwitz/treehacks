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
    var voted = Session.get('voted');
    console.log();
    if(voted.indexOf(this.text) == -1) {
      voted.push(this.text);
      Session.set('voted', voted);
      var u = parseInt(Session.get('upvotes'));
      if(u !== 0) {
        Session.set('upvotes', u-1);
      }
    }  
  },
  'click #downvote': function(event, template) {
    var voted = Session.get('voted');
    console.log();
    if(voted.indexOf(this.text) == -1) {
      voted.push(this.text);
      Session.set('voted', voted);
      var u = parseInt(Session.get('downvotes'));
      if(u !== 0) {
        Session.set('downvotes', u-1);
      }
    }
  }
});