export default function DogThumb(props) {

  return (
    <div onClick={() => {props.selectDog(props.dog, true)}} className="well clickable apiDog">
      <h3>{props.dog}</h3>
    </div>
  )
}