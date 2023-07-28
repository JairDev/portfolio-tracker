import * as React from "react";
import { default as NextLink } from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";

import NavBarProfile from "./NavBarProfile";

const pages = [
  { link: "Portafolio", path: "portfolio" },
  { link: "Mercado", path: "#market" },
  { link: "Noticias", path: "#news" },
  { link: "Conversor", path: "converter" },
];

export default function NavBar() {
  const { palette, spacing } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "none", boxShadow: "none", paddingTop: spacing(2) }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              // display: { xs: "none", md: "flex" },
              fontSize: "24px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: palette.text.primary,
              textDecoration: "none",
            }}
          >
            CoinMarket
          </Typography>
          <Typography
            component="span"
            sx={{ color: palette.primary.main, fontWeight: "700" }}
          >
            App
          </Typography>
        </Box>

        {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
          >
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
          </Menu>
        </Box> */}

        {/*  */}

        {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
        {/* <Typography
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
            textDecoration: "none",
          }}
        ></Typography> */}
        <Box
          sx={{
            flexGrow: 0,
            display: { xs: "none", md: "flex" },
          }}
        >
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
        </Box>
        <NavBarProfile />
      </Toolbar>
    </AppBar>
  );
}
