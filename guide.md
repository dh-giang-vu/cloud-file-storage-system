# Installation Guide

This guide shows you how to set up this project locally on your own PC for future development. Not that this is not a Firebase guide.

## Prerequisites

Ensure the following things have been set up:

- **Node.js**
- **npm**
- A **Firebase** project using [Blaze Plan](https://firebase.google.com/pricing) -  there is a generous free limit before billing applies
    - Create a Web App in your Firebase Project
    - Enable Authentication with Email/Password as the Sign-in method
    - Create a Cloud Storage Bucket, use Production mode
    - **Upload a text file Welcome.txt to your Cloud Storage Bucket** - the server is designed to throw an error if this file is not present

## Steps

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/dh-giang-vu/cloud-file-storage-system.git
cd cloud-file-storage-system
```

---

### 2. Set Up the Frontend

1. Navigate to the `fs-client` directory and install dependencies:

    ```bash
    cd fs-client
    npm install
    ```

2. Create an `.env` file in the `fs-client` directory and add the following variables:

    ```env
    VITE_API_URL=http://localhost:3000
    ```

3. Finally, locate firebaseConfig.js in ./fs-client/src/config/ and replace the content with your own config file:

    [Download Firebase config file or object](https://support.google.com/firebase/answer/7015592)

---

### 3. Set Up the Backend

1. Navigate to the `fs-server` directory and install dependencies:

    ```bash
    cd ../fs-server
    npm install
    ```

2. Place your Firebase Admin SDK service account key in the `fs-server` directory as `serviceAccount.json`. This file can be downloaded from the Firebase Console under **Project Settings > Service Accounts > Generate new private key**. 
    > [!WARNING]
    > **Keep this key private, do not push to GitHub**.

3. Finally, locate index.js in ./fs-server/src/ and modify the `storageBucket` property to use your own Firebase project's Cloud Storage:

    ```javascript
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'your-own-app-storage-bucket.firebasestorage.app'
    });
    ```
---

### 4. Start the Frontend Application

1. Navigate back to the `fs-client` directory and run:

    ```bash
    npm run dev
    ```

    The frontend application will start at `http://localhost:5173` by default.

---

### 5. Start the Backend Server

1. Run the following command in the `fs-server` directory:

    ```bash
    npm run dev
    ```

    The backend server will start at `http://localhost:3000`.

## Notes

- **Firebase Setup**: Ensure Firebase Cloud Storage and Authentication are properly configured in your Firebase project.
- **Environment Variables**: Keep all sensitive credentials (like Firebase private key / serviceAccount) in `.env` files and do not commit them to version control.

---

## Extra Notes - Deployment

### Frontend

- I used [Vercel](https://vercel.com) to deploy the frontend application. This is free.

### Backend

- I used [Render](https://render.com) to deploy the backend Express server. There is a [generous free limit of 750 active hours](https://docs.render.com/free#monthly-usage-limits) per month. However, the application will [spin down during inactivity period](https://docs.render.com/free#spinning-down-on-idle) and starting the service again can cause 50 seconds delay or more.

- If using Render, ensure your `serviceAccount.json` file is included in the deployment as a [secret file](https://docs.render.com/configure-environment-variables#secret-files).
