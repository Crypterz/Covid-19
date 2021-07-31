const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const notify_user_id=process.env.NOTIFY_USER_ID
const notify_api_key=process.env.NOTIFY_API_KEY
const notify_sender_id=process.env.NOTIFY_SENDER_ID
const axios = require('axios')

exports.sendmsg=(link)=>{
//   client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: TWILIO_SENDER,
//      to: '+94770167004'
//    })
//   .then(message => console.log(`Message is send. - ${message.sid}`));


  // axios
  //   .post('https://app.notify.lk/api/v1/send', {
  //     user_id:notify_user_id,
  //     api_key:notify_api_key,
  //     sender_id:notify_sender_id,
  //     to:'94777887004',
  //     message:`Certificate of registration of the company, Billing Proof, VAT, TIN, NIC, Passport, Grama Sevaka Certificate `
  //   })
  //   .then(res => {
  //     console.log(`statusCode: ${res.status}`)
  //     console.log(res)
  //   })
  //   .catch(error => {
  //     console.error(`ERROR OCCURED - ${error}`)
  //   })

}