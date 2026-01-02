import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      ...data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body.email, req.body.password);
    res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  // Client should delete tokens from localStorage
  res.status(200).json({ message: "Logged out successfully" });
};

export const refreshToken = async (req, res) => {
  try {
    const data = await authService.refreshAccessToken(req.userId);
    res.status(200).json({
      message: "Token refreshed",
      ...data,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const data = await authService.forgotPassword(req.body.email);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const data = await authService.resetPassword(
      req.params.token,
      req.body.newPassword
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const data = await authService.changePassword(
      req.user._id,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};