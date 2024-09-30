import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "./AuthContext";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { currentUserInfo } = useContext(AuthContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]); // Add state for created posts

  const fetchSavedPosts = async () => {
    try {
      const response = await apiRequest.get("users/savedPostsByUser");
      if (response.status === 200) {
        setSavedPosts(response.data.savedPosts); // Assuming API returns an array of saved posts
        setCreatedPosts(response.data.createdPosts); // Set the created posts
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };
  // Fetch saved posts from backend on mount
  useEffect(() => {
    if (currentUserInfo) fetchSavedPosts(); // Call the fetch function when the component mounts
  }, []);

  const savePost = async (postId) => {
    try {
      const response = await apiRequest.post("users/save", {
        postId,
      });
      if (response.status === 200) {
        setSavedPosts((prevPosts) => [...prevPosts, { id: postId }]);
        fetchSavedPosts();
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Function to unsave a post
  const unsavePost = async (postId) => {
    setSavedPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );
    try {
      const response = await apiRequest.post("users/save", {
        postId,
      });
      if (response.status !== 200) {
        throw new Error("Failed to unsave post");
      }
    } catch (error) {
      console.error("Error unsaving post:", error);
      // Revert state if the unsave operation fails
      setSavedPosts((prevPosts) => [...prevPosts, { id: postId }]);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      const response = await apiRequest.delete(`/posts/deletePost/${postId}`);

      if (response.status >= 200 && response.status < 300) {
        alert("Post deleted successfully");
        fetchSavedPosts();
      } else {
        console.error("Error deleting post:", response.data.message);
        alert(response.data.message || "Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  };
  return (
    <PostsContext.Provider
      value={{
        createdPosts,
        savedPosts,
        savePost,
        unsavePost,
        handleDeletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
