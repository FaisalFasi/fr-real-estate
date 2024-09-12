import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import apiRequest from "../lib/apiRequest";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  const fetchSavedPosts = async () => {
    try {
      const response = await apiRequest.get("users/savedPostsByUser");
      if (response.status === 200) {
        setSavedPosts(response.data.savedPosts); // Assuming API returns an array of saved posts
        console.log(
          "Fetched saved posts from backend on initial mount:",
          response.data.savedPosts
        );
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };
  // Fetch saved posts from backend on mount
  useEffect(() => {
    fetchSavedPosts(); // Call the fetch function when the component mounts
  }, []);

  const savePost = async (postId) => {
    try {
      const response = await apiRequest.post("users/save", {
        postId,
      });
      if (response.status === 200) {
        setSavedPosts((prevPosts) => [...prevPosts, { id: postId }]);
        fetchSavedPosts();

        console.log("Post saved successfully");
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
      console.log("Post unsaved successfully");
    } catch (error) {
      console.error("Error unsaving post:", error);
      // Revert state if the unsave operation fails
      setSavedPosts((prevPosts) => [...prevPosts, { id: postId }]);
    }
  };

  return (
    <PostsContext.Provider value={{ savedPosts, savePost, unsavePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
