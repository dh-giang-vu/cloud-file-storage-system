# API Endpoints

### `GET /`

Returns a welcome message to confirm that the server is running.

#### Response
```json
"Hello World!"
```

---

### `POST /newaccount`

Creates a new user account in Firebase Authentication and initializes a default welcome file in the user's storage.

#### Request Body
| Field     | Type   | Description          |
|-----------|--------|----------------------|
| username  | String | Username of the user |
| email     | String | Email address        |
| password  | String | Password             |

#### Response
- **200 OK**: Account created successfully.
- **400 Bad Request**: Missing required fields.
- **500 Internal Server Error**: Error message from Firebase.

```json
{
  "message": "New user created."
}
```

---

### `GET /files`

Retrieves a list of files for the authenticated user.

#### Headers
| Header          | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| Authorization   | String | JWT token from Firebase Authentication   |

#### Response
- **200 OK**: Returns an array of file names.
- **400 Bad Request**: Incorrect Authorization header format.
- **500 Internal Server Error**: Error message from Firebase.

```json
{
  "files": ["file1.txt", "file2.jpg"]
}
```

---

### `POST /upload`

Uploads a file to Firebase Cloud Storage under the authenticated user's folder.

#### Headers
| Header          | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| Authorization   | String | JWT token from Firebase Authentication   |

#### Request Body
A single file should be included in the `file` field as a form-data attachment.

#### Response
- **200 OK**: Upload successful.
- **400 Bad Request**: No file uploaded or incorrect Authorization header format.
- **500 Internal Server Error**: Error message from Firebase.

```json
{
  "uploadResponse": { /* Firebase upload response object */ }
}
```

---

### `GET /download/:filename`

Downloads a specified file for the authenticated user.

#### Headers
| Header          | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| Authorization   | String | JWT token from Firebase Authentication   |

#### Parameters
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| filename  | String | Name of the file      |

#### Response
- **200 OK**: Streamed file content.
- **400 Bad Request**: Incorrect Authorization header format.
- **500 Internal Server Error**: Error message from Firebase.

```json
{
  "message": { /* No message, the file is streamed directly to client */ }
}
```

---

### `DELETE /delete/:filename`

Deletes a specified file from Firebase Cloud Storage for the authenticated user.

#### Headers
| Header          | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| Authorization   | String | Bearer token from Firebase Authentication |

#### Parameters
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| filename  | String | Name of the file      |

#### Response
- **200 OK**: File deleted successfully.
- **400 Bad Request**: Incorrect Authorization header format.
- **500 Internal Server Error**: Error message from Firebase.

```json
{
  "message": "File deleted."
}
```