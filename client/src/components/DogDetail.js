export default function DogDetail(props) {
  console.log("HO", !props.dog)
  let dogDiv = !props.dog ? "" : (
    <div>
      <img src={props.dog.img} />
      <h3>{props.dog.breed}</h3>
      <p>{props.dog.description}</p>
    </div>
  )
  return (
    <>
    {dogDiv}
    </>
  )
}