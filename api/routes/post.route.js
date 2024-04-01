import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Post request to the homepage");
});

// router.get("/test/:id", (req, res) => {
//   res.send("Post request to the homepage");
// });

router.put("/test", (req, res) => {
  res.send("Post request to the homepage");
});

router.post("/test", (req, res) => {
  res.send("Post request to the homepage");
});
router.delete("/test", (req, res) => {
  res.send("Post request to the homepage");
});

export default router;
