import React from "react";
import "./listComp.scss";
import Card from "../Card/Card";
import ShowText from "../ShowText/ShowText";

const ListComp = ({ posts, onUnsavePost, postOwner, handleDeletePost }) => {
  const isPostSaved = (postId) => {
    return posts.some((post) => post.id === postId);
  };
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            post={post}
            isSaved={isPostSaved(post.id)}
            // isSaved={isSaved}
            // onUnsavePost={onUnsavePost}
            onUnsavePost={() => onUnsavePost(post.id)}
            handleDeletePost={handleDeletePost}
            postOwner={postOwner}
          />
        ))
      ) : (
        <ShowText message="No posts found" />
      )}
    </div>
  );
};

export default ListComp;
