import { useState } from "react"
import { TopUtilityBar } from "../components/TopUtilityBar"
import { Header } from "../components/Header"
import { ProductSection } from "../components/ProductSection"
import { Footer } from "../components/Footer"
import { CategoryNav } from "../components/CategoryNav"
import { FeaturedCategories } from "../components/FeaturedCategories"
import { PromoBanner } from "../components/PromoBanner"
import { ProductDetail } from "./ProductDetail"
import { HeroSlider } from "../components/HeroSlider"

// Mock product data
const todaysDeals = [
    {
        id: "1",
        image:
            "https://images.unsplash.com/photo-1756321426794-6006d7d3f161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcHJvZHVjdCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5MDQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Latest Smartphone Pro Max 256GB Unlocked",
        price: "$799.99",
        originalPrice: "$999.99",
        discount: "20% OFF"
    },
    {
        id: "2",
        image:
            "https://images.unsplash.com/photo-1736616967588-d81fcd6f4d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxODE1MjQ2fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: 'Ultra Thin Laptop 15.6" 16GB RAM 512GB SSD',
        price: "$1,299.99",
        originalPrice: "$1,599.99",
        discount: "19% OFF"
    },
    {
        id: "3",
        image:
            "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzE4ODQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Premium Running Shoes - Lightweight & Comfortable",
        price: "$89.99",
        originalPrice: "$129.99",
        discount: "31% OFF"
    },
    {
        id: "4",
        image:
            "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGx1eHVyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxODkzNjgxfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Luxury Automatic Watch Steel Band Classic Design",
        price: "$459.99",
        originalPrice: "$699.99",
        discount: "34% OFF"
    },
    {
        id: "5",
        image:
            "https://images.unsplash.com/photo-1580236176063-bea7f16aec30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwcHJvZHVjdCUyMHdoaXRlfGVufDF8fHx8MTc3MTkwNDQ4MHww&ixlib=rb-4.1.0&q=80&w=400",
        title: "Wireless Noise Cancelling Headphones Premium",
        price: "$199.99",
        originalPrice: "$299.99",
        discount: "33% OFF"
    },
    {
        id: "6",
        image:
            "https://images.unsplash.com/photo-1632222623518-bbbd5f1f2489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxOTAzNjk4fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Professional DSLR Camera 24MP with Lens Kit",
        price: "$1,899.99",
        originalPrice: "$2,499.99",
        discount: "24% OFF"
    }
]

const trendingProducts = [
    {
        id: "7",
        image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGFuZGJhZyUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxOTA0NDgxfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Designer Leather Handbag Crossbody Shoulder Bag",
        price: "$149.99"
    },
    {
        id: "8",
        image:
            "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzE4Mzk4NzB8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Gaming Console Controller Wireless Pro Edition",
        price: "$69.99"
    },
    {
        id: "9",
        image:
            "https://images.unsplash.com/photo-1636678827521-09587493f2df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBwbGFudHxlbnwxfHx8fDE3NzE4NDE4NzF8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Modern Ceramic Planter Set Home Decor Indoor",
        price: "$34.99"
    },
    {
        id: "10",
        image:
            "https://images.unsplash.com/photo-1662928245746-6b4a1e90f8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxODUzODQzfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Polarized Sunglasses UV Protection Fashion Style",
        price: "$49.99"
    },
    {
        id: "11",
        image:
            "https://images.unsplash.com/photo-1605050825473-dddb75d9e703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwb3V0ZG9vciUyMHNwb3J0fGVufDF8fHx8MTc3MTg4OTY5MHww&ixlib=rb-4.1.0&q=80&w=400",
        title: "Mountain Bike 21-Speed Aluminum Frame 26 Inch",
        price: "$399.99"
    },
    {
        id: "12",
        image:
            "https://images.unsplash.com/photo-1761503553976-691e7ac1ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGd1aXRhciUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzcxODEyOTQ3fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Electric Guitar Solid Body with Amplifier Bundle",
        price: "$549.99"
    }
]

const recommendedProducts = [
    {
        id: "13",
        image:
            "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcmluZyUyMGdvbGR8ZW58MXx8fHwxNzcxOTA0NDgyfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Diamond Ring 14K Gold Engagement Wedding Band",
        price: "$1,299.99"
    },
    {
        id: "14",
        image:
            "https://images.unsplash.com/photo-1770563182591-892c3180f66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbCUyMG91dGRvb3J8ZW58MXx8fHwxNzcxOTA0NDgzfDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Travel Backpack Waterproof Laptop Compartment",
        price: "$79.99"
    },
    {
        id: "15",
        image:
            "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwYXVkaW8lMjBzb3VuZHxlbnwxfHx8fDE3NzE5MDQ0ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Bluetooth Speaker Waterproof Portable Bass",
        price: "$59.99"
    },
    {
        id: "16",
        image:
            "https://images.unsplash.com/photo-1697122235975-8cb2d056aed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3klMjBmbHlpbmd8ZW58MXx8fHwxNzcxOTA0NDg0fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Drone with 4K Camera GPS FPV Quadcopter",
        price: "$899.99"
    },
    {
        id: "17",
        image:
            "https://images.unsplash.com/photo-1756321426794-6006d7d3f161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcHJvZHVjdCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5MDQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Smartphone Accessories Bundle Case Screen Protector",
        price: "$29.99"
    },
    {
        id: "18",
        image:
            "https://images.unsplash.com/photo-1632222623518-bbbd5f1f2489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxOTAzNjk4fDA&ixlib=rb-4.1.0&q=80&w=400",
        title: "Camera Tripod Professional Heavy Duty Aluminum",
        price: "$119.99"
    }
]

export default function HomePage() {
    // const [view, setView] = useState("pdp")

    // if (view === "pdp") {
    //     return <ProductDetail />
    // }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopUtilityBar />
            <Header />
            <CategoryNav />
            {/* <HeroBanner /> */}
            <HeroSlider />
            <FeaturedCategories />
            <ProductSection title="Today's Deals" products={todaysDeals} />
            <div className="h-px bg-gray-200" />
            <ProductSection title="Trending Now" products={trendingProducts} />
            <PromoBanner />
            <ProductSection
                title="Recommended for you"
                products={recommendedProducts}
            />
            <Footer />
        </div>
    )
}
