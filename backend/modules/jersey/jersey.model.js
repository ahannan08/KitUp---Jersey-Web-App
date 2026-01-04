// models/jersey.model.js
import mongoose from "mongoose";

const jerseySchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
      index: true,
    },
    clubName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    league: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["Home", "Away", "Third", "GK", "Training"], // expand if needed
      index: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// Prevent duplicate jersey rows for same club + type + image (optional)
jerseySchema.index({ clubId: 1, type: 1, image: 1 }, { unique: true });

// Faster common queries
jerseySchema.index({ league: 1, clubName: 1, type: 1 });
jerseySchema.index({ price: 1 });

export default mongoose.model("Jersey", jerseySchema);
