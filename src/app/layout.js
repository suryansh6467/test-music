import { Shantell_Sans } from "next/font/google";
import "./globals.css";

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "Sweet Favor Music",
  description: "Listen to the music."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shantellSans.className} bg-black antialiased select-none`}
      >
        {children}
      </body>
    </html>
  );
}
