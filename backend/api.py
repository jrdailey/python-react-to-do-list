from flask import Flask, jsonify
from flask_cors import CORS
from redis import Redis

redis = Redis(host='localhost', port=6379, decode_responses=True)
app = Flask(__name__)
CORS(app)

@app.route('/api/message')
def get_message():
    count = redis.incr("counter")
    return jsonify(message=f"Hello from Flask, {count}!")

if __name__ == '__main__':
    app.run(debug=True)
