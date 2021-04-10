const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HvfktAxBrXJs2UIXoIjoNLHMnrdYLJKuzrNf6RcgJeLlbNtvbmoIDM0Z2lLVt4CWzZbwYF7rqSW0QAzQejmsqcn00M4npIG4u"
);
const app = express();
app.use(express.json());
app.use(cors());
const { v4: uuidv4 } = require("uuid");

app.get("/", (req, res) => {
  res.send("Welcome into react-shop");
});

// payment process code start here
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const key = uuidv4();

    const idempotency_key = Math.random();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      }, 
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

app.listen(5000, () => {
  console.log("Your Backend is running on port:5000");
});
