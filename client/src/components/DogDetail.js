export default function DogDetail(props) {

  if (props.api) {
    return(
      <div>
        We can't get shit from the APi yet
      </div>
    )

  } else {
    console.log("HO", !props.dog)
    let dogDiv = !props.dog ? "" : (
      <div className="well">
        <img className="big-img" src={props.dog.img} />
        <div className="text-content">
          <h2>{props.dog.breed}</h2>
          <p>{props.dog.description}</p>
        </div>
      </div>
    )
    return (
      <>
      {dogDiv}
      </>
    )
  } 
}