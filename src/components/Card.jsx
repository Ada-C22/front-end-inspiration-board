const Card =({message,likeCount, name}) => {
  return (
  <>
    <li class="individualCard"> 
    <p>{message}</p>
    <p>By: {name}</p>
    <span>{likeCount}<button> like</button></span>
    <button>Delete</button>
    <button>Edit</button>
    </li>
    </>
)
}

export default Card


