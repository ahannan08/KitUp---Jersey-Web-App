import User from "./users.model.js";

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const getAllUsers = async (query = {}) => {
  const users = await User.find(query).select("-password");
  return users;
};

export const updateUser = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new Error("User not found");
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const getUserProfile = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUserProfile = async (id, updates) => {
  // Prevent updating sensitive fields
  const restrictedFields = ["password", "role", "isActive"];
  restrictedFields.forEach((field) => delete updates[field]);

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new Error("User not found");
  return user;
};