const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

module.exports = function (app) {
  app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Karta je uspesno placenja",
        payment_method: id,
        confirm: true,
      });

      console.log("Payment", payment);
      res.json({
        message: "Payment successful",
        success: true,
      });
    } catch (err) {
      console.log(err);

      res.json({
        message: "Payment failed",
        success: false,
      });
    }
  });
};
/* 
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
}); */

//module.exports = router;
