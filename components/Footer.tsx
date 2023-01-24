import { Box, Typography, Link, Icon, MenuItem } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const { spacing, palette } = useTheme();
  return (
    <Box
      sx={{
        marginTop: spacing(20),
        marginBottom: spacing(4),
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "200px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
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
          <Box sx={{ marginTop: spacing(2) }}>
            <Icon>
              <InstagramIcon />
            </Icon>
            <Icon sx={{ marginLeft: "8px" }}>
              <TwitterIcon />
            </Icon>
            <Icon sx={{ marginLeft: "8px" }}>
              <LinkedInIcon />
            </Icon>
          </Box>
        </Box>

        <Box
          sx={{
            marginLeft: "48px",
            height: "100%",
          }}
        >
          <Box sx={{ paddingLeft: "16px" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Aprender
            </Typography>
          </Box>
          <Box>
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Link
                sx={{ marginTop: "16px", color: palette.text.primary }}
                href="https://academy.binance.com/es/start-here"
                underline="hover"
              >
                Que es una criptomoneda?
              </Link>
              <Link
                sx={{ marginTop: "16px", color: palette.text.primary }}
                href="https://academy.binance.com/es/articles/what-is-a-cryptocurrency-whitepaper"
                underline="hover"
              >
                Que es un whitepaper?
              </Link>
              <Link
                sx={{ marginTop: "16px", color: palette.text.primary }}
                href="https://academy.binance.com/es/articles/what-is-a-decentralized-exchange-dex"
                underline="hover"
              >
                Que es un exchange descentralizado?
              </Link>
            </MenuItem>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: spacing(2),
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "14px", marginRight: spacing(1) }}>
            Diseño
          </Typography>
          <Link
            href="https://dribbble.com/bdyhm_dsgn"
            underline="hover"
            sx={{ fontSize: "14px", fontWeight: "bold", color: "inherit" }}
          >
            @Bdyhm
          </Link>
        </Box>

        <Box sx={{ display: "flex", marginTop: spacing(1) }}>
          <Typography sx={{ fontSize: "14px", marginRight: spacing(1) }}>
            Desarrollo
          </Typography>
          <Link
            href="https://www.linkedin.com/in/alfredo-moscoso-desarrollador-frontend/"
            underline="hover"
            sx={{ fontSize: "14px", fontWeight: "bold", color: "inherit" }}
          >
            Alfredo Moscoso
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
