import "styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { ThemeProvider } from "@mui/material";
import { theme } from "styles/theme";
import { SWRConfig } from "swr";
import fetchJson from "lib/fetchJson";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "lib/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{ fetcher: fetchJson, onError: (error) => console.log(error) }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
