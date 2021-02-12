const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  // CODE HERE
  name: {
    type: String,
    required: "Workout name is required!",
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: "Workout type is required!",
    trim: true
  },
  weight: {
    type: Number
  },
  sets: {
    type: Number
  },
  reps: {
    type: Number
  },
  duration: {
      type: Number
  },
  distance: {
      type: Number
  }

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
