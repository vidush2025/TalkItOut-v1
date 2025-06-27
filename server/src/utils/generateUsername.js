import { User } from "../models/user.model.js";

export const generateUniqueUsername = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let username, suffix;

  while (true) {
    suffix = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    username = `AnonymousUser-#${suffix}`;

    const existingUser = await User.findOne({ username });
    if (!existingUser) break; // found unique
  }

  return username;
};
