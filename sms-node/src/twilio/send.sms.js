const config = require("../config");
const client = require("twilio")(config.accountSid, config.authToken);

/**
 * Send a SMS message
 * @param {String} body - SMS Body
 * @param {String} phone - The phone number
 */
async function sendMessage(body, phone) {
  try {
    const message = await client.messages.create({
      to: phone,
      from: "+12059227035",
      body,
    });
    return message;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMessage };
