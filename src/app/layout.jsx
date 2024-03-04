import "./globals.css";

export const metadata = {
  title: "Calendar | Pick a date within 1900 to 2099",
  description: "Calendar built in NextJS-14 | Developed by Ankur Rajbongshi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta property="og:image" content="https://github.com/projecting123/calendar/blob/main/public/meta-image.png?raw=true" />
      <body>
        {children}
      </body>
    </html>
  );
}
