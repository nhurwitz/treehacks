Session.setDefault('filter', 'age');
Session.setDefault('compare', 'none');
Session.setDefault('keyword', 0);

var drawNodes;
var compareSet = [];
var users = []; 

Template.end.rendered = function() {
  this.autorun(function() {
    var minage = 1000;
    var maxage = 0;

    users = [];
    var l = Voter.find({}).fetch().length;
    for(var i = 0; i < l; i++) {
      var voter = Voter.find({}).fetch()[i];
      var voterData = [];
      var l2 = Voter.find({}).fetch()[i].votes.length;
      for(var j = 0; j < l2; j++) {
        var queriedVote = Vote.find({_id:voter.votes[j]}).fetch()[0];
        var idea = queriedVote.idea;
        
        var sentiment = queriedVote.sentiment;

        var idea_val = IDEAS_MAP[idea] * (sentiment == 0 ? -1 : 1);
        voterData.push(idea_val);
      }
      minage = Math.min(minage, voter.age);
      maxage = Math.max(maxage, voter.age);

      agree = 1;
      if (!!Session.get('keyword')) {
        if ($.inArray(Session.get('keyword'), voterData) > -1) { 
          agree = 0;
        }
        else if ($.inArray(-Session.get('keyword'), voterData) > -1) {
          agree = 2;
        }
        else {
          agree = 1;
        }
      }
      var datum = {
        age: voter.age,
        gender: voter.gender,
        language: voter.language,
        votes: voterData,
        agree: agree
      }
      
      users.push(datum);
    }

    var width = 960,
    height = 500;

  var fill = d3.scale.category10();

  var nodes = users;
  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height]);
      
  var s = d3.selectAll('svg');
  s.remove();

  var svg = d3.select("#container").append("svg")
      .attr("width", width)
      .attr("height", height);

  var colorGender = d3.scale.linear()
      .domain([minage, maxage])
      .range(['blue', 'red']);

   var colorAge = d3.scale.linear()
      .domain([minage, maxage])
      .range(['#00ccff', '#ff6600']);
      
  var colorLanguage = d3.scale.linear()
      .domain([minage, maxage])
      .range(['orange', 'green']);       


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
          case 'age': return colorAge(d.age);
          case 'gender': return d.gender == 'Not disclosed' ? 'gray' : colorGender(wordNumber(d.gender));
          case 'language': return colorLanguage(wordNumber(d.language));
          default: return colorAge(d.age); 
        } 
        
      });
  };  

  drawNodes();
  node.style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
      .call(force.drag)
      .on("mousedown", function() { d3.event.stopPropagation(); })
      .on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div
          .html("Language: " + d.language + "<br>Age: " +d.age+"<br>Gender: "+ (d.gender == 'nd' ? 'Not Disclosed' : d.gender))
            .style("left", (d.x+12) + "px")
            .style("top", (d.y+10) + "px")
            .style("opacity", 1)
            .style("display","block");
        })
      .on("mouseout",function(){div.html(" ").style("display","none");});

  force.on("tick", tick)
        .start();
  

  svg.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 1);

  div = d3.select("#container")
    .append("div") 
    .attr("class", "tooltip");

  d3.select("#container")
      .on("mousedown", mousedown);

    var foci = [{x: 150, y: 150}, {x: 600, y: 250}, {x: 1100, y: 250}];

  function tick(e) {
    var k = .1 * e.alpha;

    // Push nodes toward their designated focus.
    nodes.forEach(function(o, i) {
      o.y += (foci[o.agree].y - o.y) * k;
      o.x += (foci[o.agree].x - o.x) * k;
    });

    node
        .attr("cx", function(d) { return d.x; })
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

  Template.end.helpers({
    'keywords': function() {
      return _.map(Object.keys(IDEAS), function(value, index){
        return {value: value, index: index};
      });
    },
    'pmNetanyahu': function() {
      var current = Session.get('keyword');
      for(var i = 0; i < NETANYAHU.length; i++) {
        if(NETANYAHU[i] == current || -1*NETANYAHU[i] == current) {
          return true;
        }
      }

      return false;
    },
    'presAbbas': function() {
      var current = Session.get('keyword');
      for(var i = 0; i < ABBAS.length; i++) {
        if(ABBAS[i] == current || -1*ABBAS[i] == current) {
          return true;
        }
      }

      return false;
    }
  })


Template.end.events({
  'click #age-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'age');
    document.getElementById("age-button").className = "btn btn-primary active";
    document.getElementById("gender-button").className = "btn btn-default";
    document.getElementById("language-button").className = "btn btn-default";
    drawNodes();
  },
  'click #gender-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'gender');
    document.getElementById("age-button").className = "btn btn-default";
    document.getElementById("gender-button").className = "btn btn-primary active";
    document.getElementById("language-button").className = "btn btn-default";
    drawNodes();
  },
  'click #language-button': function(event, template) {
    event.preventDefault();
    Session.set('filter', 'language');
    document.getElementById("age-button").className = "btn btn-default";
    document.getElementById("gender-button").className = "btn btn-default";
    document.getElementById("language-button").className = "btn btn-primary active";
    drawNodes();
  },
  'click #reset-button': function(event, template) {
    Session.set('compare', 'none');
    Session.set('filter', 'none');
    if(Session.get('keyword')>0) {
      var id = "keywords" + (Session.get('keyword')-1);
      console.log(id);
      document.getElementById(id).className = "btn keywords-list";
      Session.set('keyword', 0);
    }
    
    document.getElementById("age-button").className = "btn btn-primary active";
    document.getElementById("gender-button").className = "btn btn-default";
    document.getElementById("language-button").className = "btn btn-default";
    drawNodes();
  },
  'click .keywords-list': function(event, template) {
    var prev = Session.get('keyword');
    var id;

    if(prev == 0) {
      Session.set('keyword', IDEAS_MAP[this.value]);
      id = "keywords" + this.index;
      document.getElementById(id).className = "btn2 keywords-list";
      drawNodes();
    } else if (prev-1 != this.index) {
      prev -= 1;
      id = "keywords" + prev;
      document.getElementById(id).className = "btn keywords-list";
      Session.set('keyword', IDEAS_MAP[this.value]);
      id = "keywords" + this.index;
      document.getElementById(id).className = "btn2 keywords-list";
      drawNodes();
    }
  }
});