const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const assert = require('assert');
const { parse } = require('querystring');
const nodemailer = require('nodemailer');
// const csv = require('csv');
const csv=require('csvtojson')
var twilio = require('twilio');


var checkName = /^[a-zA-Z]+$/;
var checkPhone = /^\d+$/;

const app = express();
var server = http.createServer();

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'getmazdoor@gmail.com',
    pass: 'mazdur11'
  },
  tls: {
        rejectUnauthorized: false
    }
});

var obj = csv();
function MyCSV(Fone, Ftwo) {
    this.name = Fone;
    this.phone = Ftwo;
}; 

// var mailOptions = {
//   from: 'manvaibhav012@gmail.com',
//   to: 'vk530873@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };



// templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// setting the public directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log(req.ip);
    res.render('index');
});

app.post('/contact' , (req , res) => {
    // console.log(req.body);
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(req.body);
            var result = req.body;
            console.log(result['username'] , result['phone'] , result['message']);
            // if(checkName.test(result['name']) && checkPhone.test(result['phone']) && result['phone'].length === 10 && result['message'].length!=0) 
            {
                console.log('yes');
                var send = "Name : " + result['username'] + " , Phone is : " + result['phone'] + " , Message is : " + result['message'] + '\n';
                var mailOptions = {
                  from: 'getmazdoor@gmail.com',
                  to: 'getmazdoor@gmail.com',
                  subject: 'Message from ' + result['username'] + ' ( ' + result['phone'] + ' ) via mazdoor.com',
                  text: result['message']
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    res.json('no');
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.json('yes');
                  }
                });
                // fs.writeFile('files/contact.txt', send ,  {'flag':'a'},  function(err) {
                //     if (err) {
                //         return console.error(err);
                //     }
                //     res.render('index');
                // });
            }
            
        });
    }
        // res.render('index');
    
});

app.post('/labour' , (req , res) => {
    // console.log(req.body);
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(req.body);
            var result = req.body;
            var myData = [];
            // for(var i=0;i<result['check'].length;i++) {
            //     obj.from.path('files/' + result['location'] + '-' + result['check'][i] + '.csv').to.array(function (data) {
            //     for (var index = 0; index < data.length; index++) {
            //         MyData.push(new MyCSV(data[index][0], data[index][1]));
            //     }
            //     console.log(MyData);
            // });
            // } 
            // if(checkName.test( result['name']) && checkPhone.test(result['phone']) && result['phone'].length == 10 && result['date']!='undefined' && result['choice']!='undefined' && result['location']!='undefined' && result['address']!='undefined') {
            //   // res.render('index');
            //   res.json('hi');
            // }
            // else {
            //   console.log('no');

            // }
            for(var i=0;i<result['check'].length;i++) {
                csv()
                .fromFile('files/' + result['location'] + '-' + result['check'][i] + '.csv')
                .then((jsonObj)=>{
                    console.log(jsonObj);
                    myData.push (jsonObj);
                    /**
                     * [
                     *  {a:"1", b:"2", c:"3"},
                     *  {a:"4", b:"5". c:"6"}
                     * ]
                     */ 
                });
            }
            setTimeout(function () {
                console.log(myData);
                res.json(myData);
            },1000);
            // console.log(myData);
            // res.json(myData);
        });
    }
        // res.render('index');
    
});

app.post('/message' , (req , res) => {
    // console.log(req.body);
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            var result = req.body;
            console.log(result);
           /* const accountSid = 'ACfa7990d82f31e95f0adb294f7c4066ab';
            const authToken = '5d887db8a6f9f63eb5e11c7fb71c710';
            const client = require('twilio')(accountSid, authToken);

            client.messages
                .create({
                body: 'Hello Done',
                from: '+12253803232',
                to: '+917297900292'
            })
            .then(message => console.log(message.sid))
            .done();*/
           /* var accountSid = 'ACa56c561e29113b749fbd040cc03b5258'; // Your Account SID from www.twilio.com/console
            var authToken = 'a791ccf2307fef5782ac5b3b7340cd1b';   // Your Auth Token from www.twilio.com/console

            var twilio = require('twilio');
            var client = new twilio(accountSid, authToken);

            client.messages.create({
                body: 'Hello from Node',
                to: '+917973561455',  // Text this number
                from: '+16572557909' // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));*/
            //.done();
            const Nexmo = require('nexmo');

            const nexmo = new Nexmo({
              apiKey: '51f07e9f',
              apiSecret: 'VAwUjt058AtEOTQY'
            });

            const from = 'Nexmo';
            const to = '+917973561455';
            const text = 'A text message sent using the Nexmo SMS API';
            var log='';
            nexmo.message.sendSms(from, to, text, (error, response) => {
              if(error) {
                throw error;
              } else if(response.messages[0].status != '0') {
                console.error(response);
                throw 'Nexmo returned back a non-zero status';
              } else {
                console.log(response);
                log+=response;
              }
            });
            res.json('yes');
        });
    }
        
    
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

app.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});
