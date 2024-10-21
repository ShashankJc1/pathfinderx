import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Check if model already exists to avoid recompilation errors in Next.js
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
