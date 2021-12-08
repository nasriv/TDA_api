from client_id import client_id
import requests
import pandas as pd

def callTest(symbol, periodType, period):
    url = 'https://api.tdameritrade.com/v1/marketdata/{}/pricehistory'.format(symbol)
    payload = {
        'apikey':client_id,
        'periodType':str(periodType),
        'period': str(period),
        'frequencyType':'daily',
        'frequency':'1',
        # 'startDate':str(datetime.datetime(2020,1,1,0,0).timestamp()).split('.')[0],
        # 'endDate':str(datetime.datetime(2021,1,1,0,0).timestamp()).split('.')[0],
        'needExtendedHoursData':'true'
        }

    r = requests.get(url=url, params=payload)
    return r.json()['candles']