import localFont from "next/font/local";

export const archivo = localFont({
  src: "../fonts/archivo-var.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const manrope = localFont({
  src: "../fonts/manrope-var.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const instrument = localFont({
  src: "../fonts/instrument-serif-italic.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});
