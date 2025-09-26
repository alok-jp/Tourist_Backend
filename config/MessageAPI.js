require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// 📱 Change to your verified number (in E.164 format)
const recipients = [
  '+918175025614',
  '+916203101301',
  '+918840859385',
  '+916395606174'
];// Replace with your number

const messageBody = '🚀 Hi this is from twilio';

async function sendMessages() {
  for (const toNumber of recipients) {
    try {
      const message = await client.messages.create({
        body: messageBody,
        from: fromNumber,
        to: toNumber
      });

      console.log(`✅ Sent to ${toNumber}: SID ${message.sid}`);
    } catch (error) {
      console.error(`❌ Error sending to ${toNumber}:`, error.message);
    }

    // ⏱️ Optional delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

sendMessages();
