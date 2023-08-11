import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";

const pages = ["Profile", "About"];
const settings = ["Profile",  "Dashboard"];
// import './DashBoard'

function Header({ user, logout }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  // const navigate = useNavigate();


  const styles = {
    typography: {
      mr: 2,
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
    },
    web: {
      box: { flexGrow: 1, display: { xs: "none", md: "flex" } },
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00" }}>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={[styles.typography, { display: { xs: "none", md: "flex" } }]}
          >
            Hi {user?.displayName}!
          </Typography>

          <NavMenu>
            {anchorElNav}
            {setAnchorElNav}
            {handleCloseNavMenu}
          </NavMenu>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={[
              styles.typography,
              { display: { xs: "flex", md: "none", flexGrow: 1 } },
            ]}
          >
            Hi {user?.displayName}!
          </Typography>
          <Box sx={styles.web.box}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>




          <Button className="mx-2"  key="dashboard"  onClick={() => navigate('/dashboard')}
            sx={{ my: 2, color: 'white', display: 'block' }}
>
  Dashboard
</Button>






          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user photoURL" src={user?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="logout" onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={logout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
