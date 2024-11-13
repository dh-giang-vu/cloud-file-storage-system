import { useState, useEffect } from "react";
import { useAuth } from "../security/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
} from "@mui/material";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DefaultAvatarImg from "../assets/default-avatar.jpg";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { downloadFile, getFileList, uploadFile } from "../scripts/api";

const options = [
  'Download',
  'Delete'
];

const ITEM_HEIGHT = 48;

function FileManager() {
  const { user, logout } = useAuth();
  const [files, setFiles] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };
  const handleMenuClose = (action) => {
    setAnchorEl(null);
    if (action === "Download") {
      handleDownloadFile(selectedFile);
    }
    setSelectedFile(null);
  };

  useEffect(() => {
    getFileList()
      .then((files) => setFiles(files))
      .catch((error) => alert(error));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file)
      // .then(() => getFileList())
      // .then((files) => setFiles(files))
      .then(() => setFiles([...files, file.name]))
      .catch((error) => alert(error));
  };

  const handleDownloadFile = (filename) => {
    downloadFile(filename)
      .catch((error) => alert(error));
  };

  return (
    <div>
      {/* AppBar with Avatar, Username, and Logout */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Avatar
            src={DefaultAvatarImg}
            alt="User Profile"
            sx={{ marginRight: 2 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user.displayName || "John Doe"}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Upload Button positioned above the list */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 3,
          paddingBottom: 0,
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <input
          accept="*"
          style={{ display: "none" }}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            component="span"
            color="primary"
          >
            Upload File
          </Button>
        </label>
      </Box>

      {/* List of Files */}
      <List
        sx={{
          padding: 2,
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {files.length > 0 ? (
          files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleMenuClick(e, file)}
                    >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleMenuClose(null)}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        },
                      },
                    }}
                    >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={() => handleMenuClose(option)}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              }
            >
              <ListItemIcon>
                <InsertDriveFileIcon color="action" />
              </ListItemIcon>
              <ListItemText primary={file} />
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" sx={{ margin: "20px auto" }}>
            No files uploaded yet.
          </Typography>
        )}
      </List>
    </div>
  );
}

export default FileManager;
