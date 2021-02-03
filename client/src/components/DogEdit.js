import axios from 'axios';
import {useState} from 'react';


export default function DogEdit(props) {
  const [description, setDescription] = useState('')

  function handleDogEdit(e) {
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_SERVER_URL}/dogs/${props.dogId}`, {description})
    .then(response => {
      console.log(response)
      props.setEdit(false)
      props.getDogs()
    })
  }

  return (
    <form onSubmit={e => handleDogEdit(e)}>
      <input type="text" placeholder="Say something else about him" 
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="submit" value="OK" />
      <button onClick={() => props.setEdit(false)}>Cancel</button>
    </form>
  )
}