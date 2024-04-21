import React from "react";
import "./listComp.scss";
import Card from "../Card/Card";

const ListComp = ({ posts }) => {
  console.log(posts);
  return (
    <div className="list">
      {posts?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListComp;
