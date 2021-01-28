import MyDogThumb from './MyDogThumb.js';

export default function DogContainer(props) {

  return (
    <div>
      <h2>My Doggos</h2>
      {props.myDogs.map(dog => {
        return (<MyDogThumb dog={dog} selectDog={props.selectDog} />)
      })}
    </div>
  )
}