import axios from 'axios';
import {useEffect, useState} from 'react';

import DogThumb from './DogThumb'

export default function DogContainer(props) {
  let [apiDogs, setApiDogs] = useState([]);

  useEffect(()=> {
    axios.get('https://dog.ceo/api/breeds/list/all')
    .then(response => {
      console.log(response.data.message)
      setApiDogs(Object.keys(response.data.message))
    })
  }, [])
  return (
    <div>
      <h2>List of All Good Boys</h2>
      {apiDogs.map(dog => {
        return (<DogThumb dog={dog} />)
      })}
    </div>
  )
}