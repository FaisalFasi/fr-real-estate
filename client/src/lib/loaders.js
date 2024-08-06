import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  console.log("Single Page Loader Response: ", res);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = await apiRequest("/posts?" + query);
  console.log("List Page Loader Response: ", postPromise);

  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async ({ request, params }) => {
  const postPromise = await apiRequest("/users/profilePosts");
  const chatPromise = await apiRequest("/chats");

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
