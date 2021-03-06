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
    sentiment: 1,
    source: 'Abbas'
  },
  'non-member observer State': {
    sentiment: 1,
    source: 'Abbas'
  },
};

IDEAS_MAP = [];
 
for(var i = 0;i < Object.keys(IDEAS).length; i++) {
  IDEAS_MAP[Object.keys(IDEAS)[i]] = i+1;
}

NETANYAHU = [-1, -2, -3, 4, 5, 6];
ABBAS = [-7, -8, -9, 10, 11, 12];