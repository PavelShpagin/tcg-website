import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Footer from "@/components/footer";

const inter = Roboto({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Casters",
  description: "Casters TCG",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <Script id="adobe-gothic-std">
          {`
          (function(d) {
            var config = {
              kitId: 'hmf4cfi',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
