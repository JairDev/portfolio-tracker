import * as React from "react";
import {
  Card,
  Box,
  Typography,
  Link,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

interface ArticleCardProps {
  image: string;
  title: string;
  subTitle: string;
  author: string | null;
  toUrl: string;
}
export default function ArticleCard({
  image,
  title,
  subTitle,
  author,
  toUrl,
}: ArticleCardProps) {
  const { spacing } = useTheme();
  return (
    <Card
      sx={{
        height: "100% ",
      }}
    >
      <CardActionArea
        sx={{
          width: "100%",
          height: "100% ",
        }}
      >
        <Link href={toUrl} underline="none" sx={{ color: "inherit" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100% ",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                width="140"
                height="140"
                image={image}
                alt={title}
              />
              <Box sx={{ marginTop: spacing(2) }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: "1.5",
                    color: "primary.main",
                  }}
                  component="div"
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ marginTop: spacing(2), fontSize: "16px" }}
                >
                  {subTitle}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: spacing(3),
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: "14px", marginRight: spacing(1) }}
              >
                por
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {author ? author : "Autor desconocido"}
              </Typography>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
