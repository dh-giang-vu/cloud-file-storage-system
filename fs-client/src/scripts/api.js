const API_URL = import.meta.env.VITE_API_URL;

import { getAuth } from "firebase/auth";

export async function uploadFile(file) {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();

  const formData = new FormData();
  formData.append("file", file);

  console.log(formData.get("file"));

  const response = await fetch(API_URL+'/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(
      message.message
    )
  }
}

export async function getFileList() {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(API_URL+'/files', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(
      message.message
    )
  }
  else {
    const fileList = (await response.json()).files;
    return fileList;
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


