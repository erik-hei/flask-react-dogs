import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import DogDetail from './components/DogDetail';
import DogContainer from './components/DogContainer';
import MyDogs from './components/MyDogs';

function App() {
  let [dog, setDog] = useState(null);
  let [myDogs, setMyDogs] = useState([]);
  let [api, setApi] = useState(false);

  useEffect(()=> {
    getDogs()
  }, []);

  function getDogs() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/`)
    .then(response => {
      setMyDogs(response.data)
      setApi(false)
      if (!dog) {
        setDog(response.data[0])
      } else {
        setDog(response.data[response.data.length - 1])
      }
    })
  }

  function selectDog(dog, api) {
    setApi(api);
    setDog(dog)
    window.scrollTo(0,0)
  }

  return (
    <div className="App">
      <header className="well">
        <h1>🐶 Welcome to my Doggo App!!! 🦴</h1>
      </header>
      <div className="columns">
        <div className="column">
          <DogDetail dog={dog} api={api} getDogs={getDogs}/>
          <MyDogs myDogs={myDogs} selectDog={selectDog} getDogs={getDogs}/>
        </div>
        <DogContainer selectDog={selectDog} />
      </div>
    </div>
  );
}

export default App;
