import "./globals.css";
import { Header } from "./_components/Header";
import NavigationBar from "./_components/NavigationBar";
import ApolloProviders from "@/provider/apollo-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviders>
      <html lang="en">
        <body>
          <div className="w-screen h-auto pl-14 py-[60px] relative-">
            <Header />

            <NavigationBar></NavigationBar>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ApolloProviders>
  );
}
