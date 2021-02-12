module.exports = (app) => {


    app.get("/api/workouts", ({body}, res) => {

    })

    app.get("/api/workouts/range", ({body}, res) => {
        
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

    

    app.get("/api/workouts/:id", ({body}, res) => {
        
    })


}