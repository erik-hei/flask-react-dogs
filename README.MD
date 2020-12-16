# Flask / React App

- This will be a concurrent app that you build along with the lessons throughout the week.

## Day One: Get and Post

##### Requirements

1. Set up a new react app with create-react-app
1. Have your react app fetch the data from the "index" route in your flask app that you created, and render the data out in a list
1. Have your react app submit a form that makes a post request to your flask app that will create your resource

<details>
  <summary>Click for hints - Setup</summary>

  * Create a component called `DogContainer`.
  * It will have a `dogs` array in state. A `Dog` is an object with name (string), age (number), and breed (string).
  * Render `DogContainer` in `App`
</details>

<details>
  <summary>Click for hints - Read</summary>

  * Create a `DogList` component that renders inside of `DogContainer`.
  * Once you have it showing up, make an AJAX request to your flask server to populate your dogs state.
  * Pass the dogs to DogList from state and make it render the list of dogs in some kind of nice way.
  * When it works, commit!
</details>

<details>
  <summary>Click for hints - Create</summary>

  * Create a `DogNewForm` class component that lets users enter dog info. Verify that the inputs are controlled by logging state in `render()`.  Test it, and when you know it works, commit.
  * Make a `handleSubmit` function in `DogNewForm` that just logs `"handleSubmit in DogNewForm called"` and have it called when the form is submitted.  You should see that log in the console--don't forget to `preventDefault()`.  When it works, commit.
  * In `DogContainer`, make a function `addDog()` that just logs "addDog" and pass it through props to `DogNewForm`. Make it so that clicking submit on dog form causes "addDog" to log.  When it works, commit.
  * Make `addDog` actually make an AJAX request to create a new Dog on your server. Refresh the dog list to show the newly added data.
  * When it works, commit.
</details>

## Day Two: Edit and Delete

- `jsonify` - is to make sure all our response are json
- `request` - is to make sure we can read the requests from the client
- `model_to_dict` - is to allow us to convert our Model to a jsonible object

### Models

- Remember our models are inheriting from peewee

```python
class Dog(Model):
    name = CharField()
    owner = CharField()
    breed = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE
```

- the `Model` in the Dog class argument is a class from Peewee that gives our app the ability to talk to our sql database.  

- Please spend time with the [peewee docs](http://docs.peewee-orm.com/en/latest/peewee/querying.html)



### Let's set up the "rest" of our routes!


#### Show Route

```python
@dog.route('/<id>', methods=["GET"])
def get_one_dog(id):
    print(id, 'reserved word?')
    dog = models.Dog.get_by_id(id)
    print(dog.__dict__)
    return jsonify(data=model_to_dict(dog), status={"code": 200, "message": "Success"})
```

- Here remember "route params" is defined in the url by putting the carrots, `/<id>`

#### Update Route

```python
@dog.route('/<id>', methods=["PUT"])
def update_dog(id):
    payload = request.get_json()
    query = models.Dog.update(**payload).where(models.Dog.id==id)
    query.execute()
    return jsonify(data=model_to_dict(models.Dog.get_by_id(id)), status={"code": 200, "message": "resource updated successfully"})
```


- Here we are using the `.update` and `.where` method, according to the [docs](http://docs.peewee-orm.com/en/latest/peewee/querying.html) on the `.update` and `.delete` methods we have to then `.execute` the query which will return the row in which the resource was added to the sql table


- `payload = request.get_json()` - in this line we are using the global `request` object we just talked about in the above, to "get_json" from the request, so that is the object that we will send over from the client!

-  What does `**payload` mean?

- It's what is called a spread operator, basically what that means is we can take the properties of an object and "spread them out into the method call. So for example, if we sent over an object like this.

```js
{
	"name": "MJ",
	"owner": "Jane",
	"breed": "Greyhound"
}
```

- we can spread the objects properties out like this in our method,


```python
 dog = models.Dog.update(name=payload['name'], breed=payload["breed"]).where(models.Dog.id==id)
```

### Delete Route

```python
@dog.route('/<id>', methods=["Delete"])
def delete_dog(id):
    query = models.Dog.delete().where(models.Dog.id==id)
    query.execute()
    return jsonify(data='resource successfully deleted', status={"code": 200, "message": "resource deleted successfully"})
```


- Here you'll see again we are using the `.execute()` method to run our query!