import { useState, useEffect } from 'react';
import axios from 'axios';

import DogEdit from './DogEdit';

export default function DogDetail(props) {
  let [apiImg, setApiImg] = useState('');
  let [description, setDescription] = useState('');
  let [edit, setEdit] = useState('false');

  useEffect(() => {
    setEdit(false)
    if (props.api) {
      // console.log("This is our doggo", props.dog)
      axios.get("https://dog.ceo/api/breed/" + props.dog + "/images")
      .then(response => {
        let randInd = Math.floor(Math.random() * response.data.message.length);
        setApiImg(response.data.message[randInd]);
      })
    }
  }, [props.dog]);

  function handleSubmit(e) {
    e.preventDefault();
    let payload = {
      api_key: props.dog,
      breed: props.dog,
      img: apiImg,
      description: description
    }
    console.log("PAYLOAD", payload)
    axios.post(process.env.REACT_APP_SERVER_URL + "/dogs", payload)
    .then(response => {
      console.log(response)
      props.getDogs()
      setDescription('');
    })
  }

  if (props.api) {
    return(
      <div className="well">
        <img className="big-img" src={apiImg} />
        <div className="text-content">
          <h2>{props.dog}</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>Do you want to take him home?</p>
            <input type="text" placeholder="write something about him" 
              onChange={e => setDescription(e.target.value)}
            />
            <input type="submit" value="Add Doggo" />
          </form>
        </div>
      </div>
    )

  } else {
    let dogDiv = !props.dog ? "" : (
      <div className="well">
        <img className="big-img" src={props.dog.img} />
        <div className="text-content">
          <h2>
            {props.dog.breed}
          </h2>
          {!edit ?
            (<p>{props.dog.description} <button onClick={() => setEdit(true)}>🖋</button></p>)
            :
            (<DogEdit setEdit={setEdit} dogId={props.dog.id} getDogs={props.getDogs} />)
          }
        </div>
      </div>
    )
    return (
      <>
      {dogDiv}
      </>
    )
  } 
}