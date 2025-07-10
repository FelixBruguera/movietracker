import "../src/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Header from "../src/components/Header"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-zinc-200 dark:bg-stone-800 flex flex-col min-h-screen">
          <Header />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
