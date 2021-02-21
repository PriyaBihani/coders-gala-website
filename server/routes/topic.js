const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
let topicController = require("./../controllers/topicController"),
  authMiddleware = require("./../services/middlewares/auth"),
  adminMiddleware = require("./../services/middlewares/admin");

router.post(
  "/add",
  adminMiddleware,
  [check("Name", "Topic name can not be empty").notEmpty()],
  async (req, res) => {
    try {
      let topic = await topicController.addTopic(req);
      let code = topic.statusCode;
      delete topic.statusCode;
      res.status(code).send(topic);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

router.get("/get/:specialityName", async (req, res) => {
  console.log("hittin");
  try {
    let topic = await topicController.getAllTopics(req);
    let code = topic.statusCode;
    delete topic.statusCode;
    res.status(code).send(topic);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/update/:topicId", adminMiddleware, async (req, res) => {
  try {
    let topic = await topicController.updateTopic(req);
    let code = topic.statusCode;
    delete topic.statusCode;
    res.status(code).send(topic);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/delete/:topicId", adminMiddleware, async (req, res) => {
  try {
    let topic = await topicController.deleteTopic(req);
    let code = topic.statusCode;
    delete topic.statusCode;
    res.status(code).send(topic);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
