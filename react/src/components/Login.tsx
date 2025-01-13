import React, { useContext, useRef, useState, FormEvent, useEffect, useReducer } from "react";
import { UserContext } from "./homePage";
import { Button, Modal, Box, Typography } from "@mui/material";
import { UserData } from "../reduser/rreducerUser";
import { loginUser, registerUser } from "../api/api";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = ({ login }: { login: (user: UserData) => void }) => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 
  const [success, setSuccess] = useState(true);
  const [successCreate, setSuccessCreate] = useState(false); 
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const context = useContext(UserContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(true); 
    setSuccessCreate(false);
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (nameRef.current && passwordRef.current && context) {
  //     const { user, userDispatch } = context;

  //     if (isLogin) {
   
  //       const currentUser = user.find(
  //         (u) =>
  //           u.name === nameRef.current?.value &&
  //           u.password === passwordRef.current?.value
  //       );

  //       if (currentUser) {
  //         console.log("Login successful");
  //         setSuccess(true);
  //         login(currentUser);

  //       } else {
  //         console.log("Invalid credentials");
  //         setSuccess(false);

  //       }
  //     } else {
     
  //       userDispatch({
  //         type: "ADD_USER",
  //         data: {
  //           name: nameRef.current.value,
  //           password: passwordRef.current.value,
  //           lname: "",
  //           email: "",
  //           phone: "",
  //           addres: "",
  //         },
  //       });
  //       setSuccesscreate(true);
  //       setSuccess(false);
  //       setOpen(false);
  //       setIsLogin(true);
  //     }
  //   }
  // };
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (nameRef.current && passwordRef.current) {
      if (context) {
      
        if (isLogin) {
          try {
            console.log("Trying to login...");
            const currentUser = await loginUser(
              nameRef.current.value,
              passwordRef.current.value
            );
            console.log("Login successful:", currentUser);
            login(currentUser); 
  
 
            context.currentUser = currentUser; // עדכן את המשתמש הנוכחי
  
            setSuccess(true);
            setOpen(false);
          } catch (error) {
            console.error("Login failed: Invalid credentials");
            setSuccess(false);
          }
        } else {
          try {
            console.log("Trying to create account...");
            const newUser = await registerUser({
              name: nameRef.current.value,
              password: passwordRef.current.value,
              lname: "",
              email: "",
              phone: "",
              addres: "",
            });
            console.log("Registration successful:", newUser);
  
            // עדכון הקונטקסט
            context.currentUser = newUser; // עדכן את המשתמש הנוכחי
  
            setSuccessCreate(true);
            setIsLogin(true);
            setOpen(false);
          } catch (error) {
            console.error("Registration failed");
          }
        }
      }
    }
  };
  


  return (
    <>
      <Button onClick={handleOpen}>Login</Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {isLogin ? "Login" : "Create User"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" ref={nameRef} id="name" required />
            <label htmlFor="password">Password:</label>
            <input type="password" ref={passwordRef} id="password" required />
            <Button type="submit" variant="contained" color="primary">
              {isLogin ? "Login" : "Create Account"}
            </Button>

            {/* הצגת הודעות בהתאם למצב */}
            {!isLogin && successCreate && <p>Your account has been created successfully!</p>}
            {isLogin && !success && <p>Login failed. Please try again or create an account.</p>}
          </form>

          <Typography sx={{ mt: 2 }}>
            {isLogin ? (
              !success && (
                <span>
                  Don't have an account?{" "}
                  <Button
                    onClick={() => {
                      setIsLogin(false);
                      setSuccess(true); // איפוס הודעות שגיאה
                    }}
                    color="secondary"
                  >
                    Create one
                  </Button>
                </span>
              )
            ) : (
              <span>
                Already have an account?{" "}
                <Button
                  onClick={() => {
                    setIsLogin(true);
                    setSuccessCreate(false); // איפוס הודעות הצלחה
                  }}
                  color="secondary"
                >
                  Login
                </Button>
              </span>
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
