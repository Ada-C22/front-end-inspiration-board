const Card =({message,likeCount, owner}) => {
  return (
  <>
    <li class="individualCard"> 
    <p>{message}</p>
    <p>By: {owner}</p>
    <span>{likeCount}<button> like</button></span>
    <button>Delete</button>
    <button>Edit</button>
    </li>
    </>
)
}

export default Card


