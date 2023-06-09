const stripe = require("stripe")(String(process.env.STRIPE_SECRET_KEY));
const paymentConroller = {
  async processPayment(req, res, next) {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });
      res.json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },
};

module.exports = paymentConroller;
