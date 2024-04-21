import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  console.log(res);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  // console.log(query);
  // console.log(postPromise.data);

  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async ({ request, params }) => {
  const postPromise = apiRequest("/posts");

  return defer({
    postResponse: postPromise,
  });
};
