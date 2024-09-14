import React from "react";
import "./listComp.scss";
import Card from "../Card/Card";
import ShowText from "../ShowText/ShowText";

const ListComp = ({
  posts,
  isSaved,
  onUnsavePost,
  postOwner,
  handleDeletePost,
}) => {
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            post={post}
            isSaved={isSaved}
            onUnsavePost={onUnsavePost}
            postOwner={postOwner}
            handleDeletePost={handleDeletePost}
          />
        ))
      ) : (
        <ShowText message="No posts found" />
      )}
    </div>
  );
};

export default ListComp;
