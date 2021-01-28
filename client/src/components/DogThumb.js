export default function DogThumb(props) {

  return (
    <div onClick={dog => {props.selectDog(dog, true)}} className="well clickable apiDog">
      <h3>{props.dog}</h3>
    </div>
  )
}