from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
import json
import datetime

class Next_Desitination(object):

    def __init__(self):
        # create an instance of the API class
        self.api_instance = swagger_client.DefaultApi()
        self.apikey = 'eLVAr118T0kPOfYAoIy3RYjvYgH0Gygt' 
        self.iso = loadIso()

    def getLocations(self, origin):
        #origin = 'NYC' # str | <a href=\"https://en.wikipedia.org/wiki/International_Air_Transport_Association_airport_code\">IATA code</a> of the city from which the traveler will depart. See the location and airport interfaces for more information. (default to NYC)

        tmr = datetime.datetime.now() + datetime.timedelta(days=1)
        departure_date = tmr.strftime("%Y-%m-%d")

        try:
            api_response = self.api_instance.flight_inspiration_search(self.apikey, origin, departure_date=departure_date, one_way=True, direct=True)

            result = []
            for _, item in zip(range(3), api_response.results):
                r = self.api_instance.location_information(self.apikey, item.destination)
                loc = r.airports[0].location
                result.append((origin, item.destination, loc.latitude, loc.longitude, r.airports[0].city_name + " Airport", item.departure_date, item.return_date, item.price))
                """
                res = ExtremeSearchResult(item, self.iso).getDictRes()
                if res:
                    result.append(res)
                """


            return result
        except ApiException as e:
            return "Exception when calling DefaultApi->flight_inspiration_search: %s\n" % e

def loadIso():
    import csv
    import re
    regex = re.compile('[^a-zA-Z]')
    iso = {}
    with open('./datasets/airports.dat', 'r') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in spamreader:
            if(len(row) == 14):
                row[4] = regex.sub('', row[4])
                if(len(row[4]) > 0):
                    iso[row[4]] = Airport(row).getDictRes()
    return iso

class ExtremeSearchResult:

    def __init__(self, obj, iso):
        self.airline = obj.airline
        self.departure_date = obj.departure_date
        if(obj.destination in iso):
            self.destination = iso[obj.destination]
        else:
            self.destination = False
        self.price = obj.price

    def getDictRes(self):
        if not self.destination:
            return self.destination

        return {'airline': self.airline, 'departure_date': self.departure_date, 'destination': self.destination, 'price': self.price}


class Airport:
    def __init__(self, obj):
        self.iso = obj[4].replace('"', '')
        self.name = obj[1].replace('"', '')
        self.geo = [float(obj[6]), float(obj[7])]

    def getDictRes(self):
        return {'iso' : self.iso, 'name': self.name, 'geo': self.geo}
