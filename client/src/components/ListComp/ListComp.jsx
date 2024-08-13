import React from "react";
import "./listComp.scss";
import Card from "../Card/Card";
import ShowText from "../ShowText/ShowText";

const ListComp = ({ posts, isSaved, onUnsavePost }) => {
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((item) => (
          <Card
            key={item.id}
            item={item}
            isSaved={isSaved}
            onUnsavePost={onUnsavePost}
          />
        ))
      ) : (
        <ShowText message="No posts found" />
      )}
    </div>
  );
};

export default ListComp;
