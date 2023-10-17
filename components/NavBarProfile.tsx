import React from "react";

import { default as NextLink } from "next/link";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";

import useUser from "lib/useUser";
import { Button } from "./Button";
import fetchJson from "lib/fetchJson";
import { MenuItem } from "@mui/material";

const pages = [
  { link: "Portafolio", path: "portfolio" },
  { link: "Mercado", path: "#market" },
  { link: "Noticias", path: "#news" },
  { link: "Conversor", path: "converter" },
];

export default function NavBarProfile() {
  const router = useRouter();
  const { spacing } = useTheme();
  const { userEmail, authenticated, loading, mutateUser } = useUser({});
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
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

  const logOut = async () => {
    setAnchorElUser(null);
    mutateUser(
      "api/user",
      await fetchJson("api/singout", {
        method: "POST",
      })
    );
    router.replace(router.asPath);
  };

  if (loading) {
    return (
      <Box sx={{ width: "179px", display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            component={NextLink}
            underline="none"
            color="text.primary"
            sx={{
              display: { xs: "none", md: "flex" },
              bgcolor: "primary.main",
              padding: spacing(2, 5),
              borderRadius: "8px",
              fontWeight: "600",
              opacity: router.pathname === "/login" ? 0 : 1,
            }}
            href="/login"
          >
            Iniciar sesión
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "text.primary",
                position: "relative",
              }}
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
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
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                style: {
                  width: "100%",
                  height: "100%",
                  maxWidth: "300px",
                  background: "transparent",
                },
              }}
              MenuListProps={{
                style: {
                  background: "rgba(17, 1, 30, 1)",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "80% ",
                  padding: spacing(6, 0),
                  top: "70px",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link
                    component={NextLink}
                    underline="none"
                    href={page.path}
                    color="text.primary"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    {page.link}
                  </Link>
                </MenuItem>
              ))}
              <Link
                component={NextLink}
                underline="none"
                color="text.primary"
                sx={{
                  bgcolor: "primary.main",
                  padding: spacing(2, 5),
                  borderRadius: "8px",
                  fontWeight: "600",
                  opacity: router.pathname === "/login" ? 0 : 1,
                }}
                href="/login"
              >
                Iniciar sesión
              </Link>
            </Menu>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Box sx={{ display: "flex" }}>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, display: { xs: "none", md: "block" } }}
        >
          <Avatar alt={userEmail} src="/static/images/avatar/2.jpg" />
        </IconButton>
        <Menu
          sx={{ mt: "45px", padding: "16px" }}
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
          <Box sx={{ display: "flex", alignItems: "center " }}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "500 ", padding: "16px " }}
            >
              Hola
            </Typography>

            <Typography textAlign="center" sx={{ paddingRight: "16px" }}>
              {userEmail}
            </Typography>
          </Box>
          <MenuItem sx={{ marginTop: "8px" }}>
            <LogoutIcon />
            <Button onClick={logOut} text="Cerrar sesión" />
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            // color="inherit"
            sx={{ color: "text.primary" }}
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
            PaperProps={{
              style: {
                width: "100%",
                height: "100%",
                maxWidth: "300px",
                background: "transparent",
              },
            }}
            MenuListProps={{
              style: {
                background: "rgba(17, 1, 30, 1)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "80% ",
                padding: spacing(6, 0),
                top: "70px",
              },
            }}
          >
            <Box
              sx={{
                alignItems: "center ",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Typography
                sx={{ fontSize: "18px", fontWeight: "500 ", padding: "16px " }}
              >
                Hola
              </Typography>

              <Typography textAlign="center" sx={{ paddingRight: "16px" }}>
                {userEmail}
              </Typography>
            </Box>
            {pages.map((page) => (
              <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                <Link
                  component={NextLink}
                  underline="none"
                  href={page.path}
                  color="text.primary"
                >
                  {page.link}
                </Link>
              </MenuItem>
            ))}
            <MenuItem
              sx={{ marginTop: "8px", display: { xs: "flex", md: "none" } }}
            >
              <LogoutIcon />
              <Button onClick={logOut} text="Cerrar sesión" />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
