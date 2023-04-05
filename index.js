const express = require("express");
const fs=require('fs');
const app = express();

app.use(express.json());
const dataFilePath  = 'teams.json';

// route
app.get('/teams', (req, res) => { 
  try{
    const data = JSON.parse(fs.readFileSync(dataFilePath));
    res.send(data);

  }catch(err){
    res.status(500).send(err.message);  
  }
});

// GET a team by ID
app.get('/teams/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  const team = data.find((team) => team.id === parseInt(req.params.id));
  if (!team) {
    return res.status(404).send('Team not found');
  }
  res.send(team);
});

// POST a new team
app.post('/teams', (req, res) => {
try{
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  const newTeam = {
    id: data.length + 1,
    name: req.body.name,
    trophies: req.body.trophies,
    points: req.body.points
  };
  data.push(newTeam);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.send(newTeam);
}catch(err){
  res.status(500).send(err.message); 

}
  
});


// PUT (update) a team by ID
app.put('/teams/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  const teamIndex = data.findIndex((team) => team.id === parseInt(req.params.id));
  if (teamIndex === -1) {
    return res.status(404).send('Team not found');
  }
  const updatedTeam = {
    id: parseInt(req.params.id),
    name: req.body.name,
    trophies: req.body.trophies,
    points: req.body.points
  };
  data[teamIndex] = updatedTeam;
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.send(updatedTeam);
});


// DELETE a team by ID
app.delete('/teams', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  const teamIndex = data.findIndex((team) => team.id === parseInt(req.params.id));
  if (teamIndex === -1) {
    return res.status(404).send('Team not found');
  }
  data.splice(teamIndex, 1);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.send(`Team with ID ${req.params.id} has been deleted`);
});

app.listen(3000, ()=>{  
  console.log("Server is Runing in localost :3000....")
  });