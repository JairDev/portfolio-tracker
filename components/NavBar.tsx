import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import Router from "next/router";
import Layout from "./Layout";
import useSWR from "swr";
import useUser from "../lib/useUser";
import { useTheme } from "@mui/material/styles";
import { Button } from "./Button/Button";

const pages = ["Home", "Portfolio", "Market", "News", "Converter"];
const settings = ["mail@mail.com"];

export default function NavBar() {
  const { palette } = useTheme();
  // console.log(palette);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { email, authenticated } = useUser({
    redirectTo: "",
    redirectIfFound: false,
  });

  const [isAuth, setIsAuth] = React.useState(false);
  const [isMount, setIsMount] = React.useState(false);

  React.useEffect(() => {
    // console.log("nav", email);
    // console.log("nav", authenticated);
    // console.log("mount");
    if (authenticated) {
      // setIsAuth(true);
      console.log(authenticated);
    }
    setTimeout(() => {
      setIsMount(true);
      console.log("time");
    }, 1000);
    if (authenticated) {
      console.log("time auth");

      setIsAuth(true);
    }
  }, [authenticated]);

  const logOut = async () => {
    console.log("e");
    localStorage.clear();
    await fetch("api/singout", {
      method: "POST",
    });
    Router.push("/");
  };

  return (
    <AppBar position="static" sx={{ background: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              // color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <Link href={page}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*  */}

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              // color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              // <Button
              //   key={page}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, display: "block" }}
              // >
              //   {page}
              // </Button>
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                {/* <Typography textAlign="center">{page}</Typography> */}
                <Link href={page.toLowerCase()}>{page}</Link>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isMount && !isAuth && <Link href="login">Login</Link>}

            {isMount && isAuth && (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={email} src="/static/images/avatar/2.jpg" />
              </IconButton>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography textAlign="center">{email}</Typography>
              <Button onClick={logOut} text="Logout" />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
