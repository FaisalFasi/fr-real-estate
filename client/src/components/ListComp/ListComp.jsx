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
  console.log("Posts in ListComp: ", posts);
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            item={post}
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
