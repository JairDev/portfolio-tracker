import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
export default function App({ Component, pageProps }: AppProps) {
  // const getProps = Component.getServerSideProps || ((page) => page);
  // console.log(pageProps);
  return (
    // <ThemeProvider theme={theme}>
    <SWRConfig
      value={{ fetcher: fetchJson, onError: (error) => console.log(error) }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
    // </ThemeProvider>
  );
}
