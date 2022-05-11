const router = require("express").Router();
const stripe = require("stripe")(
  sk_test_51Ky2LLG1nIyP1xYPDTIbHbrZyOSxv5VQQn8htnQvtRYgu6OgGiXts5dGG31LKqsBTYwZnWemLrbTDnztife9bIaR00btsebb1X
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
