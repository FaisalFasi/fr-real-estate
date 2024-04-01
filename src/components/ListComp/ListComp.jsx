import React from "react";
import { listData } from "../../lib/dummydata";
import Card from "../Card/Card";
import "./listComp.scss";

const ListComp = () => {
  return (
    <div className="list">
      {listData.map((item) => (
        <div key={item.id} className="listItem">
          <Card key={item.id} item={item} />
        </div>
      ))}
    </div>
  );
};

export default ListComp;
