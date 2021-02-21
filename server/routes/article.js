const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
let articleController = require("./../controllers/articleController"),
  authMiddleware = require("./../services/middlewares/auth"),
  adminMiddleware = require("./../services/middlewares/admin");

router.post(
  "/add/:topicId",
  adminMiddleware,
  [check("ArticleContent", "Article can not be empty").notEmpty()],
  [check("ArticleName", "Speciality name can not be empty").notEmpty()],
  async (req, res) => {
    try {
      // console.log(req.body);
      let article = await articleController.addArticle(req);
      let code = article.statusCode;
      delete article.statusCode;
      res.status(code).send(article);
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

router.get("/get/:id", async (req, res) => {
  try {
    let article = await articleController.getArticleById(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (err) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    let article = await articleController.updateArticleById(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (err) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/get", async (req, res) => {
  try {
    // console.log(req.body);
    let article = await articleController.getArticle(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

router.post("/delete/:articleId/:topicId", async (req, res) => {
  try {
    // console.log(req.body);
    let article = await articleController.deleteArticle(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "FAILED",
      data: null,
      error: error,
    });
  }
});

// router.get("/all", async (req, res) => {
//   try {
//     let speciality = await specialityController.getAllSpecialities(req);
//     let code = speciality.statusCode;
//     delete speciality.statusCode;
//     res.status(code).send(speciality);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

// router.put("/update/:specialityId", adminMiddleware, async (req, res) => {
//   try {
//     let speciality = await specialityController.updateSpeciality(req);
//     let code = speciality.statusCode;
//     delete speciality.statusCode;
//     res.status(code).send(speciality);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "FAILED",
//       data: null,
//       error: error,
//     });
//   }
// });

module.exports = router;
