import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const headingFont = localFont({
  src: "../public/fonts/CalSans-Font.ttf",
  variable: "--font-heading", // CSS variable
  display: "swap",
});

export const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-text", // CSS variable
  display: "swap",
});