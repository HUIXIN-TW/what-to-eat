import { Schema, model, models } from "mongoose";

const LunchIdeaSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required."],
  },
  lunchIdea: {
    type: String,
    required: [true, "Lunch idea is required."],
  },
  cafeName: {
    type: String,
    required: [true, "Cafe name is required."],
  },
  walkingTime: {
    type: String,
    required: [true, "Walking time is required."],
  },
  tags: {
    type: [String],
    required: true,
  },
});

const LunchIdea = models.LunchIdea || model("LunchIdea", LunchIdeaSchema);

export default LunchIdea;
