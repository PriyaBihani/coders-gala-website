const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
let articleController = require('./../controllers/articleController'),
  authMiddleware = require('./../services/middlewares/auth'),
  adminMiddleware = require('./../services/middlewares/admin');


router.post("/:articleId/:action", authMiddleware, async (req, res) => {
  try {
    let user = await articleController.likeArticle(req);
    let code = user.statusCode;
    delete user.statusCode;
    res.status(code).send(user);
  } catch (error) {
    res.status(500).send({
      data: null,
      error: [{ msg: error.message }],
      message: 'Internal server error',
      status: 0,
    });
  }
})


router.post(
  '/add',
  authMiddleware,
  adminMiddleware,
  [check('content', 'Article can not be empty').notEmpty()],
  [check('name', 'Article name can not be empty').notEmpty()],
  async (req, res) => {
    try {
      console.log(req.body);
      let article = await articleController.addArticle(req);
      let code = article.statusCode;
      delete article.statusCode;
      res.status(code).send(article);
    } catch (error) {
      res.status(500).send({
        data: null,
        error: [{ msg: error.message }],
        message: 'Internal server error',
        status: 0,
      });
    }
  }
);

router.get('/get/:id', async (req, res) => {
  try {
    let article = await articleController.getArticleById(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (error) {
    res.status(500).send({
      data: null,
      error: [{ msg: error.message }],
      message: 'Internal server error',
      status: 0,
    });

  }
});

router.post('/update/:id', authMiddleware,
  adminMiddleware, async (req, res) => {
    try {
      let article = await articleController.updateArticleById(req);
      let code = article.statusCode;
      delete article.statusCode;
      res.status(code).send(article);
    } catch (error) {
      res.status(500).send({
        data: null,
        error: [{ msg: error.message }],
        message: 'Internal server error',
        status: 0,
      });
    }
  });

router.post('/get', async (req, res) => {
  try {
    // console.log(req.body);
    let article = await articleController.getArticle(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (error) {
    res.status(500).send({
      data: null,
      error: [{ msg: error.message }],
      message: 'Internal server error',
      status: 0,
    });
  }
});

router.post('/delete/:articleId/:topicId', authMiddleware,
  adminMiddleware, async (req, res) => {
    try {
      // console.log(req.body);
      let article = await articleController.deleteArticle(req);
      let code = article.statusCode;
      delete article.statusCode;
      res.status(code).send(article);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        data: null,
        error: [{ msg: error.message }],
        message: 'Internal server error',
        status: 0,
      });
    }
  });

router.get("/all", async (req, res) => {
  try {
    // console.log(req.body);
    let article = await articleController.getAllArticles(req);
    let code = article.statusCode;
    delete article.statusCode;
    res.status(code).send(article);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: null,
      error: [{ msg: error.message }],
      message: 'Internal server error',
      status: 0,
    });
  }
})

router.get("/options", async (req, res) => {
  try {
    let options = await articleController.getArticleOptions(req);
    let code = options.statusCode;
    delete options.statusCode;
    res.status(code).send(options);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      data: null,
      error: [{ msg: error.message }],
      message: 'Internal server error',
      status: 0,
    });
  }
})
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
