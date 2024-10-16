import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  inquiry: { type: String, default: "General" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = models.Contact || model("Contact", ContactSchema);
export default Contact;
