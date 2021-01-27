import MyDogThumb from './MyDogThumb.js';

export default function DogContainer(props) {
  console.log(props.myDogs)
  return (
    <div>
      <h2>My Doggos</h2>
      {props.myDogs.map(dog => {
        return (<MyDogThumb dog={dog} />)
      })}
    </div>
  )
}