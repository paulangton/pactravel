from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
# create an instance of the API class
api_instance = swagger_client.DefaultApi()
apikey = 'VmaGyJA9nrXVyRtW5Dyx5tykZi4NGhlS' # str | API Key provided for your account, to identify you for API access. Make sure to keep this API key secret.
term = 'Ban' # str | Search keyword that should represent the start of a word in a city or airport name. (default to Ban)
country = 'US' # str | Identified a country based of a <a href=\"https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes\">ISO 3166-1 alpha-2 code</a> (optional) (default to US)
all_airports = False # bool | Boolean to include or not all airports, no matter their traffic rank. False by default, to only display relevant airports. (optional) (default to false)

try:
    # Airport Autocomplete - Find an IATA location code for flight search based on a city or airport name using the term parameter. By only using the country parameter, this API is also able to find all the IATA location codes associated with a country. Both term and country parameters can be used together to filter the results accordingly. The API is fully JQuery-Autocomplete compatible to enable you to quickly build a drop-down list for your users to find the right airport easily.
    api_response = api_instance.airport_autocomplete(apikey, term, country=country, all_airports=all_airports)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->airport_autocomplete: %s\n" % e)