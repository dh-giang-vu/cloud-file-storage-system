// Firebase setup
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cloud-file-storage-system.firebasestorage.app'
});

// Firebase cloud storage bucket
const bucket = admin.storage().bucket();
const auth = admin.auth();

// Express setup
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// setup new account
app.post('/newaccount', async (req, res) => {
  try {
    const displayName = req.body.username;
    if (!displayName) {
      return res.status(400).json({ message: "Missing username" });
    }

    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    const password = req.body.password;
    if (!password) {
      return res.status(400).json({ message: "Missing password" });
    }

    await auth.createUser({ email, password, displayName });
    
    const copyDestination = bucket.file(`${displayName}/Welcome.txt`);
    await bucket.file('Welcome.txt').copy(copyDestination);

    return res.status(200).json({ message: "New user created." });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});