from models import app, Doggo, db
from flask import jsonify, request
from flask_cors import CORS, cross_origin

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, origins=['*'], supports_credentials=True) 


@app.route('/')
def home():
  all_doggos = Doggo.query.all()
  results = [dog.as_dict() for dog in all_doggos]
  return jsonify(results)

@app.route('/dogs', methods=['POST'])
def post_dogs():
  if request.method == 'POST':
    data = request.get_json(silent=True)
    new_doggo = Doggo(
      api_key=data.get('api_key'), 
      breed=data.get('breed'),
      img=data.get('img'),
      description=data.get('description')
    )
    db.session.add(new_doggo)
    db.session.commit()
    return jsonify(new_doggo.as_dict())

if __name__=="__main__":
  app.run()