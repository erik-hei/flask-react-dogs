from models import app, Doggo
from flask import jsonify
from flask_cors import CORS, cross_origin

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={
    r'/*': {
        'origins': '*'
    }
})


@app.route('/')
def home():
  all_doggos = Doggo.query.all()
  results = [dog.as_dict() for dog in all_doggos]
  return jsonify(results)

if __name__=="__main__":
  app.run()