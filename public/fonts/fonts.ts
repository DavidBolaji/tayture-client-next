import localFont from "next/font/local";

export const regularFont = localFont({
  src: "./BR_Firma_Regular.otf",
  // display: "swap",
  variable: "--font-br",
});

export const boldFont = localFont({
  src: "./BR_Firma_Bold.otf",
  display: "swap",
  variable: "--font-br-b",
});
