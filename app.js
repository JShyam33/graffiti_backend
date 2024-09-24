require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const axios = require('axios');
const prisma = new PrismaClient();
const app = express();
app.use(cors({origin: true,methods: ['GET','POST','PUT','DELETE']}));

// app.options('*', function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// Other middlewares (if any)

// Example routes



app.get('/api/fetch-spray-commands', async (req, res) => {
  // Using Prisma
  console.log("Fetching images");
  const images = await prisma.image.findMany();
  let commands = [];
  images.forEach((image) => {
    commands.push(JSON.parse(image.sprayCommands));
  });
  res.json(commands);
});

app.listen(process.env.PORT, (error) => {
    console.log("Server is Starting...");
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT);
    else 
        console.log("Error occurred, server can't start", error);
    
});

