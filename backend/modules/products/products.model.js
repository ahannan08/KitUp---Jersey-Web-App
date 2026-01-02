import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
    },
    team: {
      type: String,
      required: [true, "Please specify the team"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["home", "away", "third", "special"],
      required: [true, "Please specify jersey type"],
    },
    league: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableSizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      default: ["S", "M", "L", "XL"],
    },
    material: {
      type: String,
      default: "Polyester",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Index for faster queries
productSchema.index({ team: 1, type: 1 });
productSchema.index({ name: "text", team: "text" });

export default mongoose.model("Product", productSchema);