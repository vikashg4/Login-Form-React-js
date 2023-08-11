import { TextField, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";

// import {
//   GoogleLoginButton,
//   FacebookLoginButton,
//   // GithubLoginButton,
// } from "react-social-login-buttons";
// import Divider from "../../components/Divider";


import Container from "../../components/Container";
function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // passwordConfirmation: "",
  });


  const { register
    // , googleLogin,facebookLogin ,githubLogin
     } = useAuth();
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }




  async function handleSubmit(e) {

    e.preventDefault();
    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.password 

      // !formData?.passwordConfirmation

    ) {

      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const { name, email, password,
      //  passwordConfirmation 
      } = formData;





    const emailPattern = /^\w+@gmail\.com$/;
    // const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage({
        type: "error",
        text: "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    // if (password !== passwordConfirmation) {
    //   setMessage({ type: "error", text: "Passwords must be the same!" });
    //   return;
    // }

    

    try {
      await register({ name, email, password });
      setMessage({
        type: "success",
        text: "Registration successfully Complete!",
      });
      navigate("/");
    } catch (error) {
      if (error.message) {
        setMessage({
          type: "error",
          text: error.message,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again in a few seconds!",
      });
    }
  }









  



  // async function handleGoogleLogin() {
  //   try {
  //     await googleLogin();
  //     navigate("/");
  //   } catch (error) {
  //     if (error.message) {
  //       setMessage({
  //         type: "error",
  //         text: error.message,
  //       });
  //       return;
  //     }
  //     setMessage({
  //       type: "error",
  //       text: "Error, try again in a few seconds!",
  //     });
  //   }
  // }


  // async function handleFacebookLogin() {
  //   try {
  //     await facebookLogin();
  //     navigate("/");
  //   } catch (error) {
  //     if (error.message) {
  //       setMessage({
  //         type: "error",
  //         text: error.message,
  //       });
  //       return;
  //     }
  //     setMessage({
  //       type: "error",
  //       text: "Error, try again in a few seconds!",
  //     });
  //   }
  // }


  // async function handleGithubLogin() {
  //   try {
  //     await githubLogin();
  //     navigate("/");
  //   } catch (error) {
  //     if (error.message) {
  //       setMessage({
  //         type: "error",
  //         text: error.message,
  //       });
  //       return;
  //     }
  //     setMessage({
  //       type: "error",
  //       text: "Error, try again in a few seconds!",
  //     });
  //   }
  // }



  return (

    <>
    <div
      style={{
        backgroundImage: `url(./images/sign5.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
    <Form onSubmit={handleSubmit}>
      <Container>
        <Typography sx={{ marginBottom: "30px" }} variant="h4" component="h1">
          Create account
        </Typography>


        {/* <Box sx={{ display: { md: "flex" } }}>
          <GoogleLoginButton onClick={handleGoogleLogin} />
           <FacebookLoginButton onClick={handleFacebookLogin} />

          <GithubLoginButton onClick={handleGithubLogin} />

        </Box>

        <Divider /> */}


        <TextField
          name="name"
          sx={{ marginBottom: "16px" }}
          label="Name"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
        <TextField
          name="email"
          sx={{ marginBottom: "16px" }}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          name="password"
          sx={{ marginBottom: "16px" }}
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
        />


        {/* <PasswordInput
          name="passwordConfirmation"
          sx={{ marginBottom: "16px" }}
          label="Confirm your password"
          onChange={handleInputChange}
          value={formData.passwordConfirmation}
        /> */}


        <Button
          variant="contained"
          type="submit"
          sx={{
            marginBottom: "16px",
            backgroundColor: "#00",
            "&:hover": {
              backgroundColor: "#00",
            },
          }}
      
        >
          Sign Up
        </Button>
        <Link component={RouterLink} to="/sign-in">
          <Typography>Already have an account? Log in here!</Typography>
        </Link>
      </Container>
    </Form>
    </div>
    </>
  );
}


export default SignUp;
