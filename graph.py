from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
import networkx as nx 
from networkx.readwrite import json_graph
from amadeus.next_location import Next_Desitination

def calculateIntersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4):
	x = (x1*y2 - y1*x2)*(x3-x4)-(x1-x2)*(x3*y4 - x4*y3) / ((x1 - x2)*(y3-y4) - (y1-y2)*(x3-x4))
	y = (x1*y2 - y1*x2)*(y3-y4)-(y1-y2)*(x3*y4 - x4*y3) / ((x1 - x2)*(y3-y4) - (y1-y2)*(x3-x4))
	return (x,y)

def checkDegree(graph):
	degs = nx.degree(graph)
	availableNodes = []
	for k, v in degs.items():
		if v <= 3:
			availableNodes.append(k)

	return availableNodes

def api_call(latitude=42.3656132, longitude=-71.00956020000001, category="Museum", number_of_results=15):

	# create an instance of the API class
	api_instance = swagger_client.DefaultApi()
	apikey = '5ZuuDhbYHXWkNpo7AKhxr6Ceb1aV4z3C' # str | API Key provided for your account, to identify you for API access. Make sure to keep this API key secret.
	radius = 42 # int | Radius around the center to look for points-of-interest around the given latitude and longitude in kilometers (km) (default to 42)
	lang = 'EN' # str | The preferred language of the content related to each point of interest. Content will be returned in this language if available (optional) (default to EN)
	category = 'Museum' # str | Filters the resulting points_of_interest to include only results which have a least one category containing the given provided word. Good examples are <em>museum</em>, <em>landmark</em> or <em>church</em> (optional) (default to Museum)
	geonames = False # bool | Setting this to true includes only points of interest with a geonames ID (optional) (default to false)
	vibes = True # bool | Includes content that doesn't correspond to an active physical place, but which gives the user some background information, or <em>vibe</em> for the place they are visiting. An example of this may be information on an influential demolished building that used to exist at a certain location, or more information on a district of the city (optional) (default to false)
	social_media = False # bool | Enabling this includes images from Instagram in the output results. This is disabled by default, since these images are often just pictures of people or food, which often have little relevance to the actual location (optional) (default to false)
	image_size = 'MEDIUM' # str | The size of the images you'd like to see in the response (optional) (default to MEDIUM)
	number_of_images = 1 # int | Number of images to display. (optional) (default to 4)
	try: 
		# YapQ Geosearch - Find landmarks and attractions near a given point.
		api_response = api_instance.yap_q_geosearch(apikey, latitude, longitude, radius, lang=lang, category=category, geonames=geonames, vibes=vibes, social_media=social_media, image_size=image_size, number_of_images=number_of_images, number_of_results=number_of_results)
		return api_response.points_of_interest
	except ApiException as e:
		print("Exception when calling DefaultApi->yap_q_city_name_search: %s\n" % e)
		return []

def genGraph(number_of_results=15, initial_airport="Boston Logan Airport", latit=42.3656132, longit=-71.00956020000001, airport_code="BOS" ):
	graph = nx.Graph()
	poi = api_call(latitude=latit, longitude=longit, number_of_results=number_of_results)
	graph.add_node(0, location=(latit, longit), title=initial_airport, desc="Airport", wiki="", img="", isAirport=True, isFlight=False, destination="",  airport_name="", dep_date="", ret_date="", price=0 )

	lat_long = []
	lat_long.append((latit, longit))
	miny = latit
	maxy = latit
	minx = longit
	maxx = longit
	for ind, res in enumerate(poi):
		lat_long.append([res.location.latitude, res.location.longitude])
		if res.location.latitude < miny:
			miny = res.location.latitude
		if res.location.latitude > maxy:
			maxy = res.location.latitude
		if res.location.longitude < minx:
			minx = res.location.longitude
		if res.location.longitude > maxx:
			maxx = res.location.longitude

		graph.add_node(ind+1 , location=lat_long[-1], title=res.title, desc=res.details.short_description, wiki=res.details.wiki_page_link, img=res.main_image, isAirport=False,isFlight=False, destination="",  airport_name="", dep_date="", ret_date="", price=0 )
	print(minx, maxx, miny, maxy)
	# Add the edges
	edges = []
	added_edges = []
	mind = 2000000.0
	minind = 3123211
	for i in range(len(poi)+1):
		for j in range(i + 1,len(poi)+1):
			d = ((lat_long[i][0] - lat_long[j][0]) ** 2  + (lat_long[i][1] - lat_long[j][1])** 2) ** 0.5
			if d <= 0.04:
				edges.append((i, j, d))
			if i == 0 and d < mind:

				minind = j
				mind = d

	
	
	edges.sort(key=lambda x: x[2])
	edges.insert(0, (0, minind, mind))
	

	for ind, edge in enumerate(edges):
		nodes = checkDegree(graph)
		if not nodes:
			break
		if edge[0] in nodes and edge[1] in nodes:
			notInLocation = True
			fail = False
			for e in added_edges:
				intersection = calculateIntersectionPoint(lat_long[edge[0]][1], lat_long[edge[0]][0], lat_long[edge[1]][1], lat_long[edge[1]][0], lat_long[e[0]][1], lat_long[e[0]][0], lat_long[e[1]][1], lat_long[e[1]][0])
				if intersection[0] <= maxx and intersection[0] >= minx and intersection[1] >= miny and intersection[1] <= maxy:
					fail = True
				# Check if in range of a location
				for l in lat_long:
					if abs(intersection[0] - l[1]) <= 0.005 and abs(intersection[1] - l[0]) <= 0.005:
						notInLocation = False
						break
				

			

			if not fail or not added_edges:
				added_edges.append(edge)
				graph.add_edge(edge[0], edge[1], distance=edge[2], isFlight=False)

	# Put edges in one by one until cannot
	# Add in flight edges
	dest = Next_Desitination()
	flight_tuples = dest.getLocations(airport_code)
	start = graph.number_of_nodes()
	for ix, f in enumerate(flight_tuples):
		graph.add_node(start + ix, isFlight=True, wiki="", img="", destination=f[1], location=(f[2], f[3]), title=f[4], desc="Airport", dep_date=f[5], ret_date=f[6], price=f[7] )
		graph.add_edge(0, start+ix, isFlight=True)


	data = json_graph.node_link_data(graph)
	
	with open('test_json.txt', 'w') as f:
					f.write(str(data))
	
	return data
	#nx.draw(graph)
	
genGraph()