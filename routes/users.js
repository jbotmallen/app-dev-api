const express = require("express");
const { responseHandler, genericError } = require("../services/responses");
const {
  findUserById,
} = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const id = req.userId;

    const user = await findUserById(id);

    if (!user) {
      return responseHandler(res, 404, "User not found");
    }

    return responseHandler(res, 200, "User found", user);
  } catch (error) {
    return genericError(res, error.message);
  }
});

module.exports = router;
