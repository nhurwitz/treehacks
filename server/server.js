Meteor.startup(function () {
  Meteor.publish("voters", function () {
    return Voter.find();
  });
});