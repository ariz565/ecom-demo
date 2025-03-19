import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Brand's Store - Premium Men's Fashion",
  description:
    "Discover premium men's fashion at The Brand's Store. Quality clothing that stands the test of time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <SidebarProvider>
              {children}
              <WhatsAppButton />
              <Toaster />
            </SidebarProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
