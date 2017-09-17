from flask import Flask, url_for, request, jsonify
from amadeus.next_location import Next_Desitination
import graph


app = Flask(__name__)
dest = Next_Desitination()


@app.route('/next_locations')
def next_locations():
    if 'location' not in request.args:
        return "BAD"

    loc = request.args['location']
    return jsonify({'data': dest.getLocations(loc)})


@app.route('/poi', methods=["GET"])
def points_of_interest():
	if 'latitude' not in request.args or 'longitude' not in request.args or 'airport_name' not in request.args:

		return "BAD"


	lat = float(request.args['latitude'])
	longit = float(request.args['longitude'])
	airport_name = request.args['airport_name']
	airport_code = request.args['airport_code']
	
	if lat == 0 and longit == 0:
		return jsonify({'data': graph.genGraph()})
	else:
		return jsonify({'data': graph.genGraph(initial_airport=airport_name, airport_code=airport_code, latit=lat, longit=longit)})
            
if __name__ == '__main__':
    app.run()
