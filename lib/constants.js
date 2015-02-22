IDEAS = {
  'nuclear armed Iran': {
    sentiment: 0,
    source: 'Netanyahu'
  },
  'Arab boycot movement': {
    sentiment: 0,
    source: 'Netanyahu'
  },
  'Palestinian refugees': {
    sentiment: 0,
    source: 'Netanyahu'
  },
  'modernity': {
    sentiment: 1,
    source: 'Netanyahu'
  },
  'nuclear enrichment program': {
    sentiment: 1,
    source: 'Netanyahu'
  },
  'solid security arrangements': {
    sentiment: 1,
    source: 'Netanyahu'
  },
  'Arab terror': {
    sentiment: 0,
    source: 'Abbas'
  },
  'racist occupying state': {
    sentiment: 0,
    source: 'Abbas'
  },
  'Gaza Strip': {
    sentiment: 0,
    source: 'Abbas'
  },
  'two-state solution': {
    sentiment: 1,
    source: 'Abbas'
  },
  'international humanitarian law': {
    sentiment: 0,
    source: 'Abbas'
  },
  'non-member observer State': {
    sentiment: 0,
    source: 'Abbas'
  },
};

IDEAS_MAP = [];
var i = 1;
for(var key in Object.keys(IDEAS)) {
  IDEAS_MAP[key] = i;
  i++;
}