Session.setDefault('filter', 'age');
var drawNodes;
Template.end.rendered = function() {
  this.autorun(function() {
    var minage = 1000;
    var maxage = 0;

    var users = [];
    var l = Voter.find({}).fetch().length;
    for(var i = 0; i < l; i++) {
      var voter = Voter.find({}).fetch()[i];
      var voterData = [];
      var l2 = Voter.find({}).fetch()[i].votes.length;
      for(var j = 0; j < l2; j++) {
        var queriedVote = Vote.find({_id:Voter.find({}).fetch()[i].votes[j]}).fetch()[0];
        var idea = queriedVote.idea;
        var sentiment = queriedVote.sentiment;

        var idea_val = IDEAS_MAP[idea] * (sentiment == 0 ? -1 : 1);
        voterData.push(idea_val);
      }
      minage = Math.min(minage, voter.age);
      maxage = Math.max(maxage, voter.age);
      var datum = {
        age: voter.age,
        gender: voter.gender,
        language: voter.language,
        votes: voterData
      }

      users.push(datum);
    }

    var width = 960,
    height = 500;

  var fill = d3.scale.category10();

  var nodes = users;
  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .on("tick", tick)
      .start();

  var svg = d3.select("#container").append("svg")
      .attr("width", width)
      .attr("height", height);

  var color = d3.scale.linear()
      .domain([minage, maxage])
      .range(['blue', 'red']);


  function wordNumber(word) {
    if(word == 'Male' || word == 'Hebrew')
      return minage;

    return maxage;
  }

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 8);

  drawNodes = function drawNodes() {
    node.style("fill", function(d, i) {
        switch(Session.get('filter')) {
          case 'age': return color(d.age);
          case 'gender': return d.gender == 'nd' ? 'black' : color(wordNumber(d.gender));
          case 'language': return color(wordNumber(d.language));
          default: return color(d.age); 
        } 
        
      });
  };  
  node.style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
      .call(force.drag)
      .on("mousedown", function() { d3.event.stopPropagation(); })
      .on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div
          .html(d.language + " " +d.age+" "+d.gender)
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("opacity", 1)
            .style("display","block");
        })
      .on("mouseout",function(){div.html(" ").style("display","none");});
  

  svg.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 1);

  div = d3.select("#container")
    .append("div") 
    .attr("class", "tooltip");

  d3.select("#container")
      .on("mousedown", mousedown);

  function tick(e) {

    // Push different nodes in different directions for clustering.
    var k = 6 * e.alpha;
    nodes.forEach(function(o, i) {
      o.y += i & 1 ? k : -k;
      o.x += i & 2 ? k : -k;
    });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function mousedown() {
    nodes.forEach(function(o, i) {
      o.x += (Math.random() - .5) * 40;
      o.y += (Math.random() - .5) * 40;
    });
    force.resume();
  }
  });
};

Template.end.events({
  'click #age-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'age');
    drawNodes();
  },
  'click #gender-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'gender');
    drawNodes();
  },
  'click #language-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'language');
    drawNodes();
  }
});