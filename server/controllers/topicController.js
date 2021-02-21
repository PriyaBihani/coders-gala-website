let Topic = require("../services/mongodb/models/Topic"),
  Speciality = require("../services/mongodb/models/Speciality"),
  Article = require("../services/mongodb/models/Article");
const { validationResult } = require("express-validator");
var dataTypes = require("./../services/dataTypes/mongodb");

exports.addTopic = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      message: "FAILED",
      data: null,
      errors: errors.array(),
      errorMessage: "validation Error",
      statusCode: 400,
      status: 0,
    };
  }

  try {
    const topic = new Topic(req.body);

    await topic.save();

    return {
      message: "SUCCESS",
      data: { topic: topic },
      error: null,
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

exports.getAllTopics = async (req) => {
  console.log("Fetching tpoics");
  try {
    const speciality = await Speciality.findOne({
      Name: req.params.specialityName,
    });
    console.log(speciality);
    const topics = await Topic.find({
      SpecialityId: dataTypes.ObjectId(speciality._id),
    }).populate("articles");

    return {
      message: "SUCCESS",
      data: topics,
      error: null,
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

exports.updateTopic = async (req) => {
  try {
    const topic = await Topic.findOneAndUpdate(
      { _id: req.params.topicId },
      req.body
    );

    return {
      message: "SUCCESS",
      data: topic,
      error: null,
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

exports.deleteTopic = async (req) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    const articlesArray = topic.articles;

    await Article.deleteMany({
      _id: {
        $in: articlesArray,
      },
    });

    await topic.remove();

    console.log(topic);
    return {
      message: "SUCCESS",
      data: topic,
      error: null,
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};