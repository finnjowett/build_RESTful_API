const express = require("express");
const subscriber = require("../models/subscriber");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting all
router.get("/", async (req, res) => {
  try {
    const subscirbers = await Subscriber.find();
    res.json(subscirbers);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
});
// Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});
// Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// Updating One
router.patch("/:id", getSubscriber, (req, res) => {
  res.send("all subscirbers");
});
// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  res.subscriber = subscriber;

  next();
}
module.exports = router;
