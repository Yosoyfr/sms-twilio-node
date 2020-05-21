const { Router } = require("express");
const router = Router();
const {
  indexController,
  postMessage,
  receivedMessages,
} = require("../controllers/index.controller");

//Main Routes
router.get("/", indexController);

//Send sms
router.post("/send-sms", postMessage);

//Received sms
router.post("/sms", receivedMessages);

module.exports = router;
