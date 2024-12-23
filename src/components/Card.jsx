const Card =({message,likeCount}) => {
  return (
  <>
    <li class="individualCard"> 
    <p>{message}</p>
    <span>{likeCount}<button> like</button></span>
    <button>Delete</button>
    <button>Edit</button>
    </li>
    </>
)
}

export default Card


