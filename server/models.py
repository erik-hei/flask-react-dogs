from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/doggos'
db = SQLAlchemy(app)

class Doggo(db.Model):
  __tablename__ = 'doggos'

  id = db.Column(db.Integer, primary_key=True)
  api_key = db.Column(db.String, unique=True, nullable=False)
  breed = db.Column(db.String)
  img = db.Column(db.String)
  description = db.Column(db.String)

  def __repr__(self):
    return f'Doggo(id={self.id}, api_key="{self.api_key}...)'

  def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}
