const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  // CODE HERE
  day: {
    type: Date,
    default: Date.now
  },
  exercises: {
    name: {
      type: String,
      unique: true,
      trim: true
    },
    type: {
      type: String,
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
        type: Number,
    },
    distance: {
        type: Number
    }
  }

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
