import React, { useEffect } from "react";

import Link from "next/link";
import Router, { useRouter } from "next/router";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import useUser from "lib/useUser";
import { Button } from "./Button";
import fetchJson from "lib/fetchJson";

export default function NavBarProfile() {
  const router = useRouter();
  const { userEmail, authenticated, loading, mutateUser } = useUser({});
  // console.log(userEmail, authenticated);
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
    return <Link href="login">Login</Link>;
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
