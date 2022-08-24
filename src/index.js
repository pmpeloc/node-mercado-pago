const express = require('express');
const app = express();

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token:
    'APP_USR-7061866477650609-010410-7fd797fa532c2f88606146fdfadfc8f0__LA_LC__-81717049',
});

// Routes
app.get('/checkout', (req, res) => {
  // Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: 'Computadora Apple M1',
        unit_price: 213578,
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Server
app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
