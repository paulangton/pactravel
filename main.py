from flask import Flask, url_for, request, jsonify
from amadeus.next_location import Next_Desitination
import graph


app = Flask(__name__)
dest = Next_Desitination()

@app.route('/next_locations')
def next_locations():
    loc = request.args['location']
    print(loc)
    # loc = "NYC"
    return jsonify({'dest': dest.getLocations(loc)})

@app.route('/poi')
def points_of_interest():
	print("YO")
	lat = int(request.args['latitude'])
	longit = int(request.args['longitude'])
	airport_name = request.args['airport_name']
	
	if lat == 0 and longit == 0:
		return jsonify({'flugidablah': graph.genGraph()})
	else:
		return jsonify({'flugidablah': graph.genGraph(initial_airport=airport_name, latit=lat, longit=longit)})
            
if __name__ == '__main__':
	app.run()