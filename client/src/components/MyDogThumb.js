export default function MyDogThumb(props) {

  return (
    <div onClick={() => props.selectDog(props.dog, false)} className="well clickable mydog">
      <img src={props.dog.img} />
      <h3 className="text-content">{props.dog.breed}</h3>
    </div>
  )
}