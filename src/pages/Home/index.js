import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Grid, TextField } from "@mui/material";
import { Typography, Button } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import Container from "../../components/Container";

function Home() {
  let navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/sign-in");

      setUser(user);
    });
  }, [auth, navigate]);

  function handleClose() {
    logout();
    navigate("/sign-in");
  }
  return (
    <>
      <Header user={user} logout={handleClose} />
     <Box sx={{marginTop:20}}>

     <Typography text align="center" variant="h3" component="h3">
        Hello {user?.displayName}!<br />
        <div className="p-4 box mt-3 text-center">
          Welcome to your profile <br />
          {user && user.email}
        </div>
        <div className="d-grid gap-2">
          {/* <Button         
        variant="contained"
          type="submit"
          sx={{
            marginBottom: "50px",
            marginTop:"50px",
            backgroundColor: "#00",
            width : "1.5in",
            "&:hover": {
              backgroundColor: "#00",
             
            },
          }}
                
               
        onClick={handleClose} >
          Log out
        </Button> */}
        </div>
      </Typography>

     </Box>
    </>
  );
}

export default Home;
