import React from "react";
import "./listComp.scss";
import Card from "../Card/Card";
import ShowText from "../ShowText/ShowText";

const ListComp = ({ posts }) => {
  console.log("Posts :", posts ? posts : "No posts found");
  return (
    <div className="list">
      {posts && posts.length > 0 ? (
        posts.map((item) => <Card key={item.id} item={item} />)
      ) : (
        <ShowText message="No posts found" />
      )}
    </div>
  );
};

export default ListComp;
