const express=require('express');
const app=express();
const bodyParser=require('body-parser');
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const { response } = require('express');

//middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// Agrega credenciales
mercadopago.configure({
  access_token: 'TEST-7506175788220942-080419-905bb5a4add41dcb28770102c73356e3-687393589'
});
//routes
app.post('/checkout',(req,res)=>{
    // Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "<%= global.id %>" en tu HTML
   // global.id = response.body.id;
  // console.log(response.body);
   res.redirect(response.body.init_point);
  }).catch(function(error){
    console.log(error);
  });
});
//server
app.listen(3000,()=>{
    console.log('server on port 3000');
});