import { useNavigate } from "react-router-dom";

function ListItem({ post }) {
  const navigate = useNavigate();
  // 조회수 증가
  const handleItemClick = () => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = storedPosts.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    navigate(`/info/${post.id}`);
  }

  return (
    <tr 
      key={post.id}
      className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
      // onClick={() => navigate(`/info/${post.id}`)}
      onClick={handleItemClick}
    >
      <td className="p-2 text-center">{post.id}</td>
      <td className="p-2 truncate indent-4 cursor-pointer" onClick={ () => navigate(`/info/2`) }>{post.title}</td>
      <td className="p-2 text-center truncate">{post.author}</td>
      <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{post.comments}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">{post.createdAt}</td>
    </tr>
  );
}

export default ListItem;