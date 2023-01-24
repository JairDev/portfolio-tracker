import useSWR from "swr";

import { Box, Typography, TextField, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { useRef, useState } from "react";
import { cryptoNews } from "lib/apiUrl";
import ArticleCard from "./ArticleCard";

export default function CryptoNewsData() {
  const { palette, spacing } = useTheme();
  const inputRef = useRef(null);
  const [coinNameValue, setCoinNameValue] = useState("bitcoin");

  const { data: cryptoNewsData } = useSWR(cryptoNews(coinNameValue));
  const loading = !cryptoNewsData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCoinNameValue(inputRef?.current?.value);
  };

  console.log(cryptoNewsData);

  return (
    <Box
      sx={{
        marginTop: spacing(16),
      }}
    >
      <Box id="news" sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Noticias sobre criptomonedas</Typography>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={inputRef}
              placeholder="Buscar noticia "
              sx={{
                width: "100%",
                border: "1px solid rgba(255, 255, 255, 0.103)",
                borderRadius: "8px",
                background: "#160C24",
                margin: "0px",
              }}
            />
          </form>
        </Box>
      </Box>

      <Grid container sx={{ paddingTop: spacing(2) }}>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "40vh",
                marginTop: "16px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            cryptoNewsData?.articles.slice(0, 10).map((article, i: number) => (
              <Grid
                key={article.title}
                xs={i === 0 ? 8 : 4}
                sx={{ heigth: "100%" }}
                item
              >
                <ArticleCard
                  title={article.title}
                  subTitle={article.description}
                  image={article.urlToImage}
                  author={article.author}
                  toUrl={article.url}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
