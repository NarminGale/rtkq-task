import "./App.css";
import { useState } from "react";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "./features/apiSlice";

function App() {
  const { data: posts } = useGetPostsQuery();

  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

  const [post, setPost] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    addPost({ body: post });
    setPost("");
  };

  return (
    <div className="App">
      <input
        type="text"
        value={post}
        placeholder="Enter post text"
        onChange={(e) => setPost(e.target.value)}
      />
      <button type="button" onClick={handleClick}>
        Add Post
      </button>

      <h1>Data List</h1>
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <span>
                  {post.id}. {post.body}
                </span>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
