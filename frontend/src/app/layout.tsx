import "./globals.css";
import QueryClientProviderWithDevtools from "./components/QueryClientProviderWithDevtools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="lemonade" lang="jp">
      <body className="bg-base-100 min-h-screen">
        <QueryClientProviderWithDevtools>
          {children}
        </QueryClientProviderWithDevtools>
      </body>
    </html>
  );
}
