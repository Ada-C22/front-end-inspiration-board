import './card.css'

const Card =({message,likeCount}) => {
  return (
  <>
    <li class="individual-card"> 
    <p>{message}</p>
    <span>{likeCount}<button> like</button></span>
    <button>Delete</button>
    <button>Edit</button>
    </li>
    </>
)
}

export default Card


