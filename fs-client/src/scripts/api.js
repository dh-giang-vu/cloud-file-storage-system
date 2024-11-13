const API_URL = import.meta.env.VITE_API_URL;

import { getAuth } from "firebase/auth";

export async function deleteFile(file) {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();

  const response = await fetch(API_URL + `/delete/${file}`, {
    method: 'DELETE',
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
}

export async function downloadFile(file) {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();

  const response = await fetch(API_URL + `/download/${file}`, {
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

  // Handle the file download
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', file); // or use `response.headers.get('Content-Disposition')` if it contains the filename.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
}

export async function uploadFile(file) {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URL + '/upload', {
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
  const response = await fetch(API_URL + '/files', {
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
  const response = await fetch(API_URL + '/newaccount', {
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


