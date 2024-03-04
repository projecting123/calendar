import "./globals.css";
import Footer from "@/ui/Footer";
import Navbar from "@/ui/Navbar";

export const metadata = {
  title: "Brindaban High School",
  description: "Official website for Brindaban High School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
