import tweepy

consumer_key = 'kaDVPs7HmACwAB6Cl2e4ToYKh'
consumer_secret = 'FG3PdKs1vTh9EuULZgU0rnQ7wUjdRVFrmQkdsZbxo56qaB102w'
access_token = '1387935236-JPAIQV68pNrBuhZe74rjy19akV7ZBB7FRi9lMTX'
access_token_secret = 'MVKk8OZMua09usC42AlY90pMEn6BX9BmQA9XWoEcSwHXM'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

public_tweets = api.home_timeline()
for tweet in public_tweets:
    print tweet.text