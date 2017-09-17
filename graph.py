from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
import networkx as nx 
from networkx.readwrite import json_graph
#import matplotlib
graph = nx.DiGraph()

def checkDegree():
	degs = nx.degree(graph)
	availableNodes = []
	for k, v in degs.items():
		if v <= 3:
			availableNodes.append(k)

	return availableNodes

def api_call(category="Museum"):

	# create an instance of the API class
	api_instance = swagger_client.DefaultApi()
	apikey = 'VmaGyJA9nrXVyRtW5Dyx5tykZi4NGhlS' # str | API Key provided for your account, to identify you for API access. Make sure to keep this API key secret.
	latitude = 42.3656132 # float | Latitude of the center of the search, in decimal degrees (default to 35.1504)
	longitude = -71.00956020000001 # float | Longitude of the center of the search, in decimal degrees (default to -114.57632)
	radius = 42 # int | Radius around the center to look for points-of-interest around the given latitude and longitude in kilometers (km) (default to 42)
	lang = 'EN' # str | The preferred language of the content related to each point of interest. Content will be returned in this language if available (optional) (default to EN)
	category = 'Museum' # str | Filters the resulting points_of_interest to include only results which have a least one category containing the given provided word. Good examples are <em>museum</em>, <em>landmark</em> or <em>church</em> (optional) (default to Museum)
	geonames = False # bool | Setting this to true includes only points of interest with a geonames ID (optional) (default to false)
	vibes = True # bool | Includes content that doesn't correspond to an active physical place, but which gives the user some background information, or <em>vibe</em> for the place they are visiting. An example of this may be information on an influential demolished building that used to exist at a certain location, or more information on a district of the city (optional) (default to false)
	social_media = False # bool | Enabling this includes images from Instagram in the output results. This is disabled by default, since these images are often just pictures of people or food, which often have little relevance to the actual location (optional) (default to false)
	image_size = 'MEDIUM' # str | The size of the images you'd like to see in the response (optional) (default to MEDIUM)
	number_of_images = 1 # int | Number of images to display. (optional) (default to 4)
	number_of_results = 15 # int | The maximum number of points of interest to return in the results set. This is a range from 1 to 100 (optional) (default to 20)
	try: 
		# YapQ Geosearch - Find landmarks and attractions near a given point.
		api_response = api_instance.yap_q_geosearch(apikey, latitude, longitude, radius, lang=lang, category=category, geonames=geonames, vibes=vibes, social_media=social_media, image_size=image_size, number_of_images=number_of_images, number_of_results=number_of_results)
		return api_response.points_of_interest
	except ApiException as e:
		print("Exception when calling DefaultApi->yap_q_city_name_search: %s\n" % e)
		return []

def genGraph(number_of_results=10):
	

	poi = api_call()
	graph.add_node(0, location=(42.3656132,-71.00956020000001), title="Boston Logan Airport", desc="Airport", wiki="", img="")
	lat_long = []
	lat_long.append((42.3656132,-71.00956020000001))
	for ind, res in enumerate(poi):
		lat_long.append([res.location.latitude, res.location.longitude])

		graph.add_node(ind, location=lat_long[-1], title=res.title, desc=res.details.short_description, wiki=res.details.wiki_page_link, img=res.main_image)

	# Add the edges
	edges = []
	print(len(poi))
	for i in range(len(poi)):
		for j in range(i + 1,len(poi)):
			edges.append((i, j, ((lat_long[i][0] - lat_long[j][0]) ** 2  + (lat_long[i][1] - lat_long[j][1])** 2) ** 0.5))
	edges.sort(key=lambda x: x[2])
	for ind, edge in enumerate(edges):
		nodes = checkDegree()
		if not nodes:
			break
		if edge[0] in nodes and edge[1] in nodes:
			graph.add_edge(edge[0], edge[1], distance=edge[2])

	# Put edges in one by one until cannot

	data = json_graph.node_link_data(graph)
	#nx.draw(graph)
	with open('test_json.txt', 'w') as f:
		f.write(str(data))
	

    

genGraph()