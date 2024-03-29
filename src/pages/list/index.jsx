import React from "react";
import "./list.scss";
import Filter from "../../components/Filter/Filter";
import { listData } from "../../lib/dummydata";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";

const List = () => {
  const data = listData;

  return (
    <div className="list">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default List;
