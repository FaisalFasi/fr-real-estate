import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Map from "../../components/Map/Map";
import "./listPage.scss";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import { usePostsContext } from "../../context/PostsContext";

const ListPage = () => {
  const data = useLoaderData();
  const { savedPosts, savePost, unsavePost } = usePostsContext();

  const isPostSaved = (postId) => {
    return savedPosts.some((post) => post.id === postId);
  };

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          <div className="listing flex flex-col gap-4 ">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Failed to load data</p>}
              >
                {(postResponse) => {
                  if (postResponse.data.length === 0) {
                    return <p>No posts found</p>;
                  }
                  return postResponse.data.map((post) => (
                    <Card
                      key={post.id}
                      post={post}
                      isSaved={isPostSaved(post.id)}
                      onSave={() => savePost(post.id)}
                      onUnsavePost={() => unsavePost(post.id)}
                      postOwner={data?.postResponse?.data?.postOwner}
                    />
                  ));
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Failed to load data</p>}
          >
            {(postResponse) => {
              return <Map items={postResponse.data} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
