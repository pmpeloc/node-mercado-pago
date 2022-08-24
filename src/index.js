const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token:
    'APP_USR-4674466007646516-082413-5a65133baae1e69a6541ba55dcd8ccbf-1185502101',
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Routes
app.post('/checkout', (req, res) => {
  // Crea un objeto de preferencia
  const { title } = req.body;
  const { price } = req.body;
  const preference = {
    items: [
      {
        title,
        unit_price: parseInt(price),
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // console.log(response.body);
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Server
app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
