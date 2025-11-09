// npm install twilio

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
                from: 'whatsapp:+<Your Twilio WhatsApp Number>',
        contentSid: '<Your Content SID>',
        contentVariables: '{"1":"12/1","2":"3pm"}',
        to: 'whatsapp:+<Your Number>'
    })
    .then(message => console.log(message.sid))
    // .done();