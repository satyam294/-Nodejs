const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
  fs.appendFile('./log.txt', `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
    next();
  });
});


// Connection : url to database process and specific collection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => {
    console.log('Database connected...');

    // start server only after db is connected
    app.listen(PORT, () => {
      console.log(`Server started, listening on port ${PORT}...`);
    });

  })
  .catch((err) => console.log('Server initialization falied: ', err));


// Schema 
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
}, { timestamps: true });

// Model -> data collection for some specific entity (table)
const User = mongoose.model("user", userSchema);

// routes

// server side rendering (SSR)
app.get('/users', async (req, res) => {
  const allUsers = await User.find({});

  const html = `
    <ul>
      ${allUsers.map((user) => {
        return `<li>${user.firstName} - ${user.email}</li>`;
      }).join("")
      }
    </ul>
  `;

  return res.status(200).send(html);
});

// GET - all users
app.get('/api/users', async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});



// dynamic path parameters : the third path in url is a variable -> sp start with ':' and name it anything
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ status: "user not found" });
  return res.status(200).json(user);
});



// embedding requests on the same route
app.route('/api/users/:id')

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"});
    return res.json({ status: 'success' });
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: 'success' });
  });



app.post('/api/users', async (req, res) => {
  const userData = req.body;

  if (!userData ||
    !userData.first_name ||
    !userData.last_name ||
    !userData.email ||
    !userData.gender ||
    !userData.job_title) {
    return res.status(400).json({ status: "incomplete user details" });
  }

  // create a new entry
  const newUser = await User.create({
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
    gender: userData.gender,
    jobTitle: userData.job_title,
  });

  return res.status(201).json({ msg: 'success' });

});