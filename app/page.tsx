import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import BestSellers from "@/components/best-sellers"
import NewArrivals from "@/components/new-arrivals"
import TrendingProducts from "@/components/trending-products"
import Collections from "@/components/collections"
import Categories from "@/components/categories"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BestSellers />
        <NewArrivals />
        <TrendingProducts />
        <Collections />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

