import { TopUtilityBar } from "../components/TopUtilityBar"
import { Header } from "../components/Header"
import { CategoryNav } from "../components/CategoryNav"
import { ProductGallery } from "../components/ProductGallery"
import { ProductInfo } from "../components/ProductInfo"
import { BuyBox } from "../components/BuyBox"
import { SellerInfo } from "../components/SellerInfo"
import { ProductSpecs } from "../components/ProductSpecs"
import { SimilarItems } from "../components/SimilarItems"
import { Reviews } from "../components/Reviews"
import { SellerFeedback } from "../components/SellerFeedback"
import { Footer } from "../components/Footer"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heart, Info, ShoppingCart, Zap } from "lucide-react"

// Mock product data
// const productImages = [
//     "https://images.unsplash.com/photo-1678599694227-549a5420f352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9kdWN0JTIwcHJvZmVzc2lvbmFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxOTA1MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     "https://images.unsplash.com/photo-1762512949120-5d6ff938a92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBiYWNrJTIwdmlldyUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxOTA1MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     "https://images.unsplash.com/photo-1745847768386-35ee12035cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBsZW5zJTIwY2xvc2UlMjBkZXRhaWx8ZW58MXx8fHwxNzcxOTA1MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     "https://images.unsplash.com/photo-1739387161072-8de153f9cdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBhY2Nlc3NvcmllcyUyMGJ1bmRsZXxlbnwxfHx8fDE3NzE5MDUwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     "https://images.unsplash.com/photo-1767431846422-35b93b89764f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwYWNrYWdpbmclMjBib3h8ZW58MXx8fHwxNzcxOTA1MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
// ]

const productInfo = {
    title:
        "Professional DSLR Camera 24.2MP Full Frame Sensor with 24-70mm Lens Kit",
    condition: "Brand New",
    rating: 4.8,
    reviewCount: 1847,
    highlights: [
        "24.2MP Full-Frame CMOS Sensor for exceptional image quality",
        "4K UHD Video Recording at 30fps with clean HDMI output",
        "Advanced 51-point AF System with 15 cross-type sensors",
        "ISO range 100-32000 (expandable to 50-102400)",
        "Includes 24-70mm f/2.8 professional zoom lens",
        "Dual SD card slots for backup and overflow recording",
        '3.2" touchscreen LCD with Live View functionality'
    ]
}

const buyBoxData = {
    price: "$2,499.99",
    originalPrice: "$3,199.99",
    shipping: "FREE",
    deliveryDate: "Wed, Feb 26",
    location: "New York, USA",
    available: 12
}

const sellerData = {
    name: "ProCameraGear",
    rating: 98.7,
    feedbackCount: 24583,
    location: "New York, United States",
    memberSince: "Mar 2015"
}

const productDescription = `This professional-grade DSLR camera is designed for serious photographers and videographers who demand the highest quality and performance. The 24.2MP full-frame CMOS sensor delivers stunning image quality with exceptional detail and dynamic range.

The advanced 51-point autofocus system ensures sharp, precise focus in any shooting situation, while the wide ISO range (100-32000, expandable to 50-102400) provides excellent low-light performance.

This complete kit includes a professional 24-70mm f/2.8 lens, perfect for everything from landscapes to portraits. The camera features 4K UHD video recording, dual SD card slots, and a large 3.2" touchscreen LCD for easy operation.

Built with a durable magnesium alloy body and weather sealing, this camera is ready for any shooting environment. Whether you're a professional photographer, videographer, or serious enthusiast, this camera system will exceed your expectations.`

const specifications = [
    { label: "Brand", value: "ProCamera" },
    { label: "Model", value: "PC-5000D" },
    { label: "Sensor Type", value: "Full Frame CMOS" },
    { label: "Megapixels", value: "24.2MP" },
    { label: "ISO Range", value: "100-32000 (expandable to 50-102400)" },
    { label: "Video Resolution", value: "4K UHD (3840 x 2160) at 30fps" },
    { label: "Autofocus Points", value: "51-point AF system (15 cross-type)" },
    { label: "Shutter Speed", value: "1/8000 to 30 seconds" },
    { label: "Continuous Shooting", value: "7 fps" },
    { label: "LCD Screen", value: '3.2" touchscreen (1,040k dots)' },
    { label: "Lens Mount", value: "Professional F-mount" },
    { label: "Included Lens", value: "24-70mm f/2.8 ED VR" },
    { label: "Battery Life", value: "Approximately 900 shots" },
    { label: "Weight", value: "840g (body only)" },
    { label: "Dimensions", value: "146 x 124 x 79mm" },
    { label: "Connectivity", value: "Wi-Fi, Bluetooth, USB-C, HDMI" },
    { label: "Card Slots", value: "Dual SD card slots (UHS-II compatible)" },
    { label: "Condition", value: "Brand New in Box" },
    { label: "Warranty", value: "Manufacturer 1-year warranty" }
]

const similarProducts = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1756321426794-6006d7d3f161?w=400",
        title: "Mirrorless Camera Body 26MP with 4K Video",
        price: "$1,899.99",
        rating: 4.7
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1632222623518-bbbd5f1f2489?w=400",
        title: "Professional Camera Tripod Carbon Fiber",
        price: "$249.99",
        rating: 4.9
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1745847768386-35ee12035cd5?w=400",
        title: "Camera Lens 50mm f/1.4 Prime Portrait",
        price: "$449.99",
        rating: 4.8
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1606489131923-c661614706e5?w=400",
        title: "Camera Bag Backpack Waterproof Professional",
        price: "$89.99",
        rating: 4.6
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1678599694227-549a5420f352?w=400",
        title: "External Flash Speedlight TTL Compatible",
        price: "$179.99",
        rating: 4.5
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1739387161072-8de153f9cdd1?w=400",
        title: "Memory Card 128GB UHS-II SD Card Fast",
        price: "$49.99",
        rating: 4.8
    }
]

const reviews = [
    {
        id: "1",
        reviewer: "PhotoEnthusiast123",
        rating: 5,
        title: "Outstanding camera for professionals",
        content:
            "This camera exceeded all my expectations. The image quality is phenomenal, especially in low light. The autofocus is incredibly fast and accurate. The 4K video capability is a huge plus. Highly recommended for anyone serious about photography.",
        date: "Feb 18, 2026",
        verified: true
    },
    {
        id: "2",
        reviewer: "JohnDoePhotography",
        rating: 5,
        title: "Best camera I've ever owned",
        content:
            "As a professional wedding photographer, I need equipment I can rely on. This camera has been flawless. The dual card slots give me peace of mind, and the battery life is excellent. The included lens is sharp and versatile.",
        date: "Feb 15, 2026",
        verified: true
    },
    {
        id: "3",
        reviewer: "NatureLover88",
        rating: 4,
        title: "Great camera, slight learning curve",
        content:
            "The image quality is superb and the build quality feels premium. There are a lot of features to learn, but once you get the hang of it, this camera is incredible. The only minor issue is the weight - it's a bit heavy for long shoots.",
        date: "Feb 10, 2026",
        verified: true
    }
]

const sellerFeedback = {
    positivePercentage: 98.7,
    totalFeedback: 24583,
    feedbackBreakdown: {
        positive: 24263,
        neutral: 198,
        negative: 122
    },
    recentFeedback: [
        {
            id: "1",
            type: "positive",
            comment: "Fast shipping, item exactly as described. Great seller!",
            date: "Feb 22, 2026",
            buyer: "buyer_8234"
        },
        {
            id: "2",
            type: "positive",
            comment:
                "Excellent communication and packaging. Camera arrived in perfect condition.",
            date: "Feb 20, 2026",
            buyer: "photo_pro_45"
        },
        {
            id: "3",
            type: "positive",
            comment:
                "Very professional seller. Item shipped same day. Highly recommend!",
            date: "Feb 18, 2026",
            buyer: "camera_enthusiast"
        }
    ]
}

export function ProductDetail() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [product, setProduct] = useState(null)

    const fetchProductDetail = async () => {
        if (!id) return

        try {
            setLoading(true)
            const productRes = await fetch(`http://localhost:9999/products/${id}`)
            const productData = await productRes.json()

            setProduct(productData)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) fetchProductDetail()
    }, [id])

    if (loading) return <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-10" />
    if (error) return <div>Something went wrong: {error}</div>

    const {
        title,
        description,
        price,
        images,
        categoryId,
        sellerId,
        isAuction,
        quantity,
        status
    } = product

    const productImages = images || []
    const sellerInfo = {
        id: product?.sellerId._id,
        username: product?.sellerId.username,
        avatarUrl: product?.sellerId.avatarURL
    }
    const productInfo = {
        title: product?.title,
        description: product?.description,
        price: product?.price,
        categoryname: product?.categoryId.name,
        categoryDescription: product?.categoryId.description,
        isAuction: product?.isAuction,
        quantity: product?.quantity,
        status: product?.status
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopUtilityBar />
            <Header />
            <CategoryNav />

            {/* Breadcrumb */}
            {/* <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-[1400px] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <a href="#" className="hover:text-blue-600">
                            Home
                        </a>
                        <span>/</span>
                        <a href="#" className="hover:text-blue-600">
                            Electronics
                        </a>
                        <span>/</span>
                        <a href="#" className="hover:text-blue-600">
                            Cameras & Photo
                        </a>
                        <span>/</span>
                        <span className="text-gray-900">Digital Cameras</span>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="mx-auto max-w-[1400px] px-4 py-8">
                {/* Product Overview Section */}
                <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left: Gallery */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={productImages} />
                    </div>

                    {/* Center: Product Info */}
                    <div className="lg:col-span-5">
                        <div className="text-2xl font-bold text-gray-800 pb-4 border-b border-gray-300 mb-4">
                            {productInfo.title}
                            {/* iRobot Roomba j7+ Self-Emptying Vacuum Cleaning Robot - Certified Refurbished! */}
                        </div>

                        <div className="flex items-center gap-4 pb-4 border-b border-gray-300 mb-4">
                            <img
                                src={sellerInfo.avatarUrl}
                                alt={title}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-bold text-gray-800">
                                    {sellerInfo.username}
                                </span>

                                <Link
                                    to={`/seller/${sellerInfo.username}`}
                                    className="text-base text-gray-800 underline hover:text-gray-500 cursor-pointer"
                                >
                                    Seller's other items
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4 border-b border-gray-300 mb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold text-gray-800">
                                    US ${productInfo.price}
                                </span>
                                <span className="text-base text-gray-800 flex items-center gap-2 underline hover:text-gray-500 cursor-pointer">
                                    <Info className="h-4 w-4" />
                                    Price details
                                </span>

                            </div>
                        </div>

                        <div className="space-y-2 pb-4 border-b border-gray-300 mb-4">
                            <button className="flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 font-semibold text-white text-lg hover:bg-blue-700">
                                Buy It Now
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-lg text-blue-600 hover:bg-blue-50">
                                Add to cart
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-lg text-blue-600 hover:bg-blue-50">
                                <Heart className="h-5 w-5" />
                                Add to Watchlist
                            </button>
                        </div>
                    </div>

                    {/* Right: Buy Box */}
                    {/* <div className="lg:col-span-3">
                        <BuyBox {...buyBoxData} />
                        <div className="mt-4">
                            <SellerInfo {...sellerData} />
                        </div>
                    </div> */}
                </div>

                {/* Product Details Section */}
                <div className="mb-8">
                    <ProductSpecs
                        description={productDescription}
                        specifications={specifications}
                    />
                </div>

                {/* Similar Items */}
                <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <SimilarItems
                        title="Similar sponsored items"
                        products={similarProducts}
                    />
                </div>

                {/* Reviews Section */}
                <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <Reviews
                        averageRating={4.8}
                        totalReviews={1847}
                        ratingDistribution={[1245, 458, 98, 32, 14]}
                        reviews={reviews}
                    />
                </div>

                {/* Seller Feedback Section */}
                <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <SellerFeedback {...sellerFeedback} />
                </div>
            </div>

            <Footer />
        </div>
    )
}
