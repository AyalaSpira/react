import { ChangeEvent, useContext, useState } from "react";
import { Avatar, Box, Button, Modal, Stack, TextField } from "@mui/material";
import { UserContext } from "./homePage";
import { deepOrange } from "@mui/material/colors";
import { UserData } from "../reduser/rreducerUser";
import { updateUser } from "../api/api";

const UserNameAvatar = () => {
  const context = useContext(UserContext);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<UserData>>(context?.currentUser || {});

  if (!context || !context.currentUser) return null;

  const { currentUser, userDispatch } = context;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdate(false);
  
    if (currentUser.id) {
      try {
        console.log("try to update user...");
        console.log(updatedUser);

        const updated = await updateUser(currentUser.id,updatedUser);//-
        console.log("updated",updated);

        userDispatch({
          type: "UPDATE_USER",
          data: updated,
        });
      } catch (error) {
        console.error("Failed to update user");//-
        console.error("Failed to update user", error);//+
      }
    }

  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>
        {currentUser ? updatedUser.name[0] : " "}
      </Avatar>

      <div>{updatedUser.name}</div>
      <Button onClick={() => setIsUpdate(true)}>Update Profile</Button>
      <Modal open={isUpdate} onClose={() => setIsUpdate(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={updatedUser.name || currentUser.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lname"
            value={updatedUser.lname || currentUser.lname}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={updatedUser.email || currentUser.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone" 
            name="phone"
            value={updatedUser.phone || currentUser.phone}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="addres"
            value={updatedUser.addres|| currentUser.addres}
            onChange={handleInputChange}
          />
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setIsUpdate(false)}>Cancel</Button>
        </Box>
      </Modal>
    </Stack>
  );
};

export default UserNameAvatar;
