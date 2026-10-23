import { Young_Serif, Figtree } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Puppy Yoga Bali | Yoga with rescue puppies in Canggu & Ubud",
    template: "%s | Puppy Yoga Bali",
  },
  description:
    "The original puppy yoga in Bali. A gentle 60-minute yoga class surrounded by rescue puppies from Aseman Bali Dog Association, in Canggu and Ubud.",
};

export const viewport = {
  themeColor: "#eceee8",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${figtree.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Lets the hero hide its pieces before GSAP runs; CSS falls back to visible if it never does. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
