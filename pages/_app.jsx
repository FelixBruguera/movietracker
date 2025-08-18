import "../src/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Header from "../src/components/Header"
import { Toaster } from "@/components/ui/sonner"
import Head from "next/head"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-col min-h-screen max-w-screen">
          <Head>
            <title>Movie Tracker</title>
            <meta property="og:title" content="Movie Tracker" />
            <link rel="icon" href="/icon.ico" type="image/x-icon" />
          </Head>
          <Header />
          <Component {...pageProps} />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
