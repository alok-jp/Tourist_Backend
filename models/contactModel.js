const moongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    phone:{ type: String, required: true}
})

module.exports = mongoose.model("Contact", contactSchema);

