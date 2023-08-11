import { TextField, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import {
  GoogleLoginButton,
  FacebookLoginButton,
  // GithubLoginButton,
} from "react-social-login-buttons";
import Divider from "../../components/Divider";
import Container from "../../components/Container";

function SignIn() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    login,
    googleLogin,
    facebookLogin,
    // , githubLogin
  } = useAuth();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { email, password } = formData;

    const emailPattern = /^\w+@gmail\.com$/;
    // const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // password validation
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage({
        type: "error",
        text: "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }

      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
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

  async function handleFacebookLogin() {
    try {
      await facebookLogin();
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
            <Typography
              sx={{ marginBottom: "30px" }}
              variant="h4"
              component="h1"
            >
              Sign In
            </Typography>

            {/* <Box sx={{ display: { md: "flex" } }}>
          <GoogleLoginButton onClick={handleGoogleLogin} />
          <FacebookLoginButton onClick={handleFacebookLogin} />

          
        </Box> */}

            {/* <Divider /> */}

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
              Log In
            </Button>

            <Divider />

            <Box sx={{ display: { md: "flex" } }}>
              <GoogleLoginButton onClick={handleGoogleLogin} />
              <FacebookLoginButton onClick={handleFacebookLogin} />
              {/* <GithubLoginButton onClick={handleGithubLogin} /> */}
            </Box>

            <Link component={RouterLink} to="/sign-up">
              <Typography>I don't have an account!</Typography>
            </Link>
          </Container>
        </Form>
      </div>
    </>
  );
}
export default SignIn;
