import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import DogDetail from './components/DogDetail';
import DogContainer from './components/DogContainer';
import MyDogs from './components/MyDogs';

function App() {
  let [dog, setDog] = useState(null);
  let [myDogs, setMyDogs] = useState([]);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/`)
    .then(response => {
      setMyDogs(response.data)
      if (!dog) {
        setDog(response.data[0])
      }
    })
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Welcome to my Doggo App!!!</h1>
      </header>
      <div>
        <div>
          <DogDetail dog={dog} />
          <MyDogs myDogs={myDogs}/>
        </div>
        <DogContainer />
      </div>
    </div>
  );
}

export default App;
