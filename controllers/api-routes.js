const Workout = require("../models/workoutModel.js");
const mongoose = require('mongoose')

module.exports = (app) => {


    app.get("/api/workouts", ({body}, res) => {

        Workout.find({}, (err, data) => {
            // console.log(data);
            res.json(data)
        })

        // console.log("*********************************************************************");
        // Workout.aggregate([
        //     {
        //         "$unwind": "$exercises"
        //     },
        //     {$group: {
        //         _id: "$_id",
        //         weight: {$sum: "$exercises.weight"},
        //         sets: {$sum: "$exercises.sets"},
        //         reps: {$sum: "$exercises.reps"},
        //         duration: {$sum: "$exercises.duration"},
        //         distance: {$sum: "$exercises.distance"}
        //         }
        //     }

        // ], (err, data) => {
        //     console.log(data);
        //     // res.json(data)
        // })
        
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