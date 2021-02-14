const Workout = require("../models/workoutModel.js");
const mongoose = require('mongoose')

module.exports = (app) => {


    app.get("/api/workouts", ({body}, res) => {
        Workout.aggregate([
            {
                "$unwind": "$exercises"
            },
            {$group: {
                _id: "$_id",
                weight: {$sum: "$exercises.weight"},
                sets: {$sum: "$exercises.sets"},
                reps: {$sum: "$exercises.reps"},
                duration: {$sum: "$exercises.duration"},
                distance: {$sum: "$exercises.distance"}
                }
            }
            
            
        ], function(err, data) {
            return 
        })
    })

    app.get("/api/workouts/range", ({body}, res) => {
        Workout.find({}, (err, data) => {
            if (err) throw err;
            res.json(data)
        })
    })

    app.post("/api/workouts", ({body}, res) => {
        Workout.create(body)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
      });

    

    app.put("/api/workouts/:id", (req, res) => {
        Workout.updateOne({_id: ObjectId(req.params.id)}, {body}, (err, result) => {
            if (err) throw err;
            console.log("Updated successfully!");
        })
    })


}