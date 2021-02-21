const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
let specialityController = require("./../controllers/specialityController"),
  authMiddleware = require("./../services/middlewares/auth"),
  adminMiddleware = require("./../services/middlewares/admin");

router.post(
  "/add",
  adminMiddleware,
  [check("ArticleContent", "Article can not be empty").notEmpty()],
  [check("Name", "Speciality name can not be empty").notEmpty()],
  [check("imageUrl", "ImageURL can not be empty").notEmpty()],
  async (req, res) => {
    try {
      let speciality = await specialityController.addSpeciality(req);
      let code = speciality.statusCode;
      delete speciality.statusCode;
      res.status(code).send(speciality);
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

router.get("/all", async (req, res) => {
  try {
    let speciality = await specialityController.getAllSpecialities(req);
    let code = speciality.statusCode;
    delete speciality.statusCode;
    res.status(code).send(speciality);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.get("/get/:specialityName", async (req, res) => {
  try {
    let speciality = await specialityController.getSpeciality(req);
    let code = speciality.statusCode;
    delete speciality.statusCode;
    res.status(code).send(speciality);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/update/:specialityId", adminMiddleware, async (req, res) => {
  try {
    let speciality = await specialityController.updateSpeciality(req);
    let code = speciality.statusCode;
    delete speciality.statusCode;
    res.status(code).send(speciality);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/delete/:specialityId", adminMiddleware, async (req, res) => {
  try {
    let speciality = await specialityController.deleteSpeciality(req);
    let code = speciality.statusCode;
    delete speciality.statusCode;
    res.status(code).send(speciality);
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
