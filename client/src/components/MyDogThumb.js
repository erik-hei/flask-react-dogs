import axios from 'axios';
export default function MyDogThumb(props) {
  const handleDelete = () => {
    axios.delete(process.env.REACT_APP_SERVER_URL + "/dogs/" + props.dog.id)
    .then(response => {
      console.log(response)
      props.selectDog(0, false)
      props.getDogs()
    })
  }

  return (
    <div onClick={() => props.selectDog(props.dog, false)} className="well clickable mydog">
      <img src={props.dog.img} />
      <h3 className="text-content">{props.dog.breed}</h3>
      <button onClick={handleDelete}>X</button>
    </div>
  )
}