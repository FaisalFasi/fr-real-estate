import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
// import Map from "../Map/Map";
import "./listPage.scss";

import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";

const ListPage = () => {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Failed to load data</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Failed to load data</p>}
          >
            {(postResponse) => {
              console.log(postResponse.data);
              <Map items={postResponse.data} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
