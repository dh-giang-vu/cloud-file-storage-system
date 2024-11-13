const API_URL = import.meta.env.VITE_API_URL;

import { getAuth } from "firebase/auth";

export async function uploadFile(file) {
  const auth = getAuth();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("user", auth.currentUser.displayName);

  console.log(API_URL);

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
}

export async function createNewAccount(username, email, password) {
  const body = { username, email, password };
  const response = await fetch(API_URL+'/newaccount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(
      message.message
    )
  }
}


