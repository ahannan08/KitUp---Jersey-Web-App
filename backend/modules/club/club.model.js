// models/club.model.js
import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Arsenal should be unique as a club name
    },
    league: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Helpful indexes
clubSchema.index({ name: 1 });
clubSchema.index({ league: 1, name: 1 });

export default mongoose.model("Club", clubSchema);
