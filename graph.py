from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
import networkx as nx 
from networkx.readwrite import json_graph

def genGraph(number_of_results=10):
	# create an instance of the API class
	api_instance = swagger_client.DefaultApi()
	apikey = 'VmaGyJA9nrXVyRtW5Dyx5tykZi4NGhlS' # str | API Key provided for your account, to identify you for API access. Make sure to keep this API key secret.
	city_name = 'Boston' # str | The name of the <a href=\"http://yapq.io/cities.txt\">supported city</a> for which you are searching, in the selected language. (default to Tel Aviv)
	lang = 'EN' # str | The preferred language of the content related to each point of interest. Content will be returned in this language if available (optional) (default to EN)
	#category = 'Museum' # str | Filters the resulting points_of_interest to include only results which have a least one category containing the given provided word. Good examples are <em>museum</em>, <em>landmark</em> or <em>church</em> (optional) (default to Museum)
	geonames = False # bool | Setting this to true includes only points of interest with a geonames ID (optional) (default to false)
	vibes = False # bool | Includes content that doesn't correspond to an active physical place, but which gives the user some background information, or <em>vibe</em> for the place they are visiting. An example of this may be information on an influential demolished building that used to exist at a certain location, or more information on a district of the city (optional) (default to false)
	social_media = True # bool | Enabling this includes images from Instagram in the output results. This is disabled by default, since these images are often just pictures of people or food, which often have little relevance to the actual location (optional) (default to false)
	image_size = 'MEDIUM' # str | The size of the images you'd like to see in the response (optional) (default to MEDIUM)
	number_of_images = 4 # int | Number of images to display (optional) (default to 4)
	number_of_results = 10 # int | The maximum number of points of interest to return in the results set. This is a range from 1 to 100 (optional) (default to 20)

	try: 
	    # YapQ City Name Search - Find landmarks and attractions in a given city.
	    api_response = api_instance.yap_q_city_name_search(apikey, city_name, lang=lang, geonames=geonames, vibes=vibes, social_media=social_media, image_size=image_size, number_of_images=number_of_images, number_of_results=number_of_results)
	    pprint(api_response)
	except ApiException as e:
	    print("Exception when calling DefaultApi->yap_q_city_name_search: %s\n" % e)

genGraph()