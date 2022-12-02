import React, { useEffect } from "react";

import { default as NextLink } from "next/link";
import Router, { useRouter } from "next/router";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

import useUser from "lib/useUser";
import { Button } from "./Button";
import fetchJson from "lib/fetchJson";
import useSWR from "swr";

// import Button from "@mui/material/Button";

export default function NavBarProfile() {
  const router = useRouter();
  const { palette, spacing, shape } = useTheme();
  const theme = useTheme();
  console.log(theme);
  // console.log(palette.primaryButton);
  const { userEmail, authenticated, loading, mutateUser } = useUser({});

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
    return <div>Cargando</div>;
  }

  if (!authenticated) {
    return (
      <Link
        component={NextLink}
        underline="none"
        color="text.primary"
        sx={{
          bgcolor: "primary.main",
          // background: "primary",
          // color: palette.mainFontColor,
          padding: spacing(2, 4),
          borderRadius: shape.borderRadius,
        }}
        href="/login"
      >
        Login
      </Link>
      // <Button text="Login" />
      // <Button variant="contained">Contained</Button>
    );
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={userEmail} src="/static/images/avatar/2.jpg" />
      </IconButton>
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
        <Typography textAlign="center">{userEmail}</Typography>
        <Button onClick={logOut} text="Logout" />
      </Menu>
    </Box>
  );
}