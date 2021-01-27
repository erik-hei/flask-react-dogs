export default function MyDogThumb(props) {

  return (
    <div className="well clickable mydog">
      <img src={props.dog.img} />
      <h3 className="text-content">{props.dog.breed}</h3>
    </div>
  )
}