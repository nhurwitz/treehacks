import pprint
from pygoogle import pygoogle
pp = pprint.PrettyPrinter(indent=4)


# aclhemy api
from alchemyapi.alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

def parse(query):
    g = pygoogle('%s speech full text' % query)
    g.pages = 1

    keywords = []
    for link in g.get_urls():
        response = alchemyapi.keywords('url', link, {'sentiment': 1})

        if response['status'] == 'OK':
            for keyword in response['keywords']:
                try:
                    keywords.append((float(keyword['sentiment']['score']), keyword['text']))
                except:
                    pass
        else:
            print('Error in keyword extraction call: ', response['statusInfo'])


    keywords.sort()

    negative_kws = keywords[:20]
    positive_kws = keywords[-20:]

    return negative_kws, positive_kws

print 'Netanyahu'
print '========='
print 'negative'
print '---------'
n,p = parse('netanyahu')
for kw in n: print kw
print 'positive'
print '---------'
for kw in p: print kw

print ''
print ''

print 'Abbas'
print '========='
print 'negative'
print '---------'
n,p = parse('abbas')
for kw in n: print kw
print 'positive'
print '---------'
for kw in p: print kw
