// Firebase setup
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cloud-file-storage-system.firebasestorage.app'
});

// Firebase cloud storage bucket
const bucket = admin.storage().bucket();

// Firebase authentication
const auth = admin.auth();

// Express setup
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const multer = require('multer');
const upload = multer();

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

    const userRecord = await auth.createUser({ email, password, displayName });

    const copyDestination = bucket.file(`${userRecord.uid}/Welcome.txt`);
    await bucket.file('Welcome.txt').copy(copyDestination);

    return res.status(200).json({ message: "New user created." });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/files', async (req, res) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Incorrect Authorization header format" });
    }

    const token = authHeader.slice(7);
    const decodedToken = await auth.verifyIdToken(token);
    const [files] = await bucket.getFiles({ prefix: `${decodedToken.uid}/` });
    const fileNames = files.map((file) => (file.name).slice(decodedToken.uid.length + 1));

    return res.status(200).json({ files: fileNames });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }

});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Incorrect Authorization header format" });
    }

    const token = authHeader.slice(7);
    const decodedToken = await auth.verifyIdToken(token);

    const destination = `${decodedToken.uid}/${req.file.originalname}`;
    const file = bucket.file(destination);
    const uploadResponse = await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    return res.status(200).json({ uploadResponse });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;

    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Incorrect Authorization header format" });
    }

    const token = authHeader.slice(7);
    const decodedToken = await auth.verifyIdToken(token);

    const destination = `${decodedToken.uid}/${filename}`;
    const file = bucket.file(destination);

    file.createReadStream().pipe(res);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }

});

app.delete('/delete/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;

    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Incorrect Authorization header format" });
    }

    const token = authHeader.slice(7);
    const decodedToken = await auth.verifyIdToken(token);

    const destination = `${decodedToken.uid}/${filename}`;
    const file = bucket.file(destination);

    await file.delete();
    return res.status(200).json({ message: "File deleted." });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});