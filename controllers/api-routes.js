const Workout = require("../models/workoutModel.js");
const mongoose = require('mongoose')

module.exports = (app) => {


    app.get("/api/workouts", ({body}, res) => {

        Workout.find({}, (err, data) => {
            console.log(JSON.stringify(data[4]));
            
            // res.json(data)
        })

        // console.log("*********************************************************************");
        Workout.aggregate([
            {
                "$unwind": "$exercises"
            },
            {
                $group: {
                    if: {"$eq": ["$exercises.type", "resistance"]},
                    then: {
                        weight: {$sum: "$exercises.weight"},
                        sets: {$sum: "$exercises.sets"},
                        reps: {$sum: "$exercises.reps"},
                        duration: {$sum: "$exercises.duration"}
                    },
                    else: {
                        duration: {$sum: "$exercises.duration"},
                        distance: {$sum: "$exercises.distance"}
                    }
                },
                
            },
            {
                $group: {
                    exercises: {
                        $push: {
                            if: {"$eq": ["$exercises.type", "resistance"]},
                            then: {
                                type: "$type",
                                name: "$name",
                                weight: "$weight",
                                sets: "$sets",
                                reps: "$reps",
                                duration: "$duration",
                                distance: "$distance"
                            },
                            else: {
                                type: "$type",
                                name: "$name",
                                duration: "$duration",
                                distance: "$distance"
                            }
                        }
                    },
                    _id: "$_id",
                    day: "$day"
                }
            }

        ], (err, data) => {
            // if(err) throw err;
            console.log(data + " hereerererrrrrrrrrr");
            // res.json(data)
        })
        
    })

    app.get("/api/workouts/range", ({body}, res) => {
        Workout.find({}, (err, data) => {
            if (err) throw err;
            res.json(data)
        })
    })

    app.post("/api/workouts", (req, res) => {
        Workout.create(req, (err, data) => {
            if (err) throw err;
            res.json(data)
        })

      });

    

    app.put("/api/workouts/:id", (req, res) => {
        Workout.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$push: {exercises: req.body}}, (err, result) => {
            if (err) throw err;
            res.json("Updated successfully!");
        })
    })


}