export default function MyDogThumb(props) {

  return (
    <div>
      <img src={props.dog.img} />
      <h3>{props.dog.breed}</h3>
    </div>
  )
}