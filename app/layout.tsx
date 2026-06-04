import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfquickly.xyz"),

icons: {
  icon: "/favicon.ico",
},

  title: {
    default: "PDFQuickly - Free Online PDF Tools",
    template: "%s | PDFQuickly",
  },

  description:
    "Free online PDF tools. Merge PDF, Split PDF, JPG to PDF, PDF to JPG, Rotate PDF, Remove Pages, Add Watermark and more. No sign up. No watermark.",

  keywords: [
    "PDF tools",
    "Merge PDF",
    "Split PDF",
    "PDF to JPG",
    "PDF to Word",
    "JPG to PDF",
    "Text to PDF",
    "PNG to PDF",
    "Image to PDF",
    "Rotate PDF",
    "Extract PDG Pages",
    "Add Watermark",
    "Add Page Numbers",
    "Remove PDF Pages",
    "PDF Organizer",
    "PDF Preview",
    "Free PDF Tools",
  ],

  openGraph: {
    title: "PDFQuickly - Free Online PDF Tools",
    description:
      "Free online PDF tools with no sign up and no watermark.",
    url: "https://pdfquickly.xyz",
    siteName: "PDFQuickly",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PDFQuickly Free Online PDF Tools",
    description:
      "Free online PDF tools with no sign up and no watermark.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-9X1SGZJR7R"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9X1SGZJR7R');
  `}
</Script>
  <body className="min-h-full bg-slate-50 text-slate-950 flex flex-col">
    {children}
  </body>
</html>
  );
}
