from flask import Flask, url_for, request, jsonify
from amadeus.next_location import Next_Desitination
import graph


app = Flask(__name__)
dest = Next_Desitination()

@app.route('/next_locations')
def next_locations():
    return jsonify({'dest': dest.getLocations('NYC')})

@app.route('/poi')
def points_of_interest():
    return "hello"
            
if __name__ == '__main__':
    app.run()