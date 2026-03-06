import { TopUtilityBar } from "../components/TopUtilityBar"
import { Header } from "../components/Header"
import { CategoryNav } from "../components/CategoryNav"
import { ProductGallery } from "../components/ProductGallery"
import { ProductSpecs } from "../components/ProductSpecs"
import { SimilarItems } from "../components/SimilarItems"
import { Reviews } from "../components/Reviews"
import { SellerFeedback } from "../components/SellerFeedback"
import { Footer } from "../components/Footer"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AlertCircle, Heart, Info, ShoppingCart, Zap } from "lucide-react"

// Mock product data
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
    const [orderQuantity, setOrderQuantity] = useState(1)
    const [quantityError, setQuantityError] = useState(null)

    const fetchProductDetail = async () => {
        if (!id) return

        try {
            setLoading(true)
            const productRes = await fetch(`http://localhost:9999/products/${id}`)
            const productData = await productRes.json()

            setProduct(productData)
        } catch (error) {
            console.error("Error fetching data:", error)
            setError('Cannot load product detail')
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
        _id,
        title,
        description,
        price,
        images,
        categoryId,
        sellerId,
        isAuction,
        quantity,
        status,
        updatedAt
    } = product

    const updateDate = updatedAt ?? product.createdAt

    const productImages = images || []
    const sellerInfo = {
        id: product?.sellerId._id,
        username: product?.sellerId.username,
        avatarUrl: product?.sellerId.avatarURL
    }
    const productInfo = {
        id: product?._id,
        title: product?.title,
        description: product?.description,
        price: product?.price,
        categoryName: product?.categoryId.name,
        categoryDescription: product?.categoryId.description,
        isAuction: product?.isAuction,
        quantity: product?.quantity,
        status: product?.status
    }

    const handleOrderQuantityChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setOrderQuantity("")
            setQuantityError("Please enter a quantity of 1 or more")
            return
        }

        const num = Number(value)

        if (num < 1) {
            setOrderQuantity(num)
            setQuantityError("Please enter a quantity of 1 or more")
            return
        }

        if (num > productInfo.quantity) {
            setOrderQuantity(num)
            setQuantityError(`Only ${productInfo.quantity} item(s) available`)
            return
        }

        setOrderQuantity(num)
        setQuantityError("")
    }

    return (
        <div className="min-h-screen bg-white">
            <TopUtilityBar />
            <Header />
            <CategoryNav />

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
                        </div>

                        <div className="flex items-center gap-4 pb-4 border-b border-gray-300 mb-4">
                            <img
                                src={sellerInfo.avatarUrl}
                                alt={title}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col gap-1">
                                <span className="text-base font-bold text-gray-800">
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

                        <div className="flex flex-col pb-4 border-b border-gray-300 mb-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-3 text-base">
                                <span className="font-medium text-gray-700">Quantity:</span>
                                <input
                                    type="number"
                                    min={1}
                                    value={orderQuantity}
                                    onChange={handleOrderQuantityChange}
                                    className={`w-24 rounded-xl border-2 px-3 py-2 text-center outline-none ${error
                                        ? "border-red-500 focus:border-red-600"
                                        : "border-gray-400 focus:border-gray-700"
                                        }`}
                                />
                                <span className="text-gray-600">
                                    {productInfo.quantity} available ·{" "}
                                    <span className="text-red-600 font-semibold">112 sold</span>
                                </span>
                            </div>

                            {quantityError && (
                                <div className="mt-2 ml-20 flex items-center gap-2 text-sm text-red-600">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                                        !
                                    </span>
                                    <span>{quantityError}</span>
                                </div>
                            )}

                            <button className="mt-5 mb-2 flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 font-semibold text-white text-base hover:bg-blue-700">
                                Buy It Now
                            </button>
                            <button className="mb-2 flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-base text-blue-600 hover:bg-blue-50">
                                Add to cart
                            </button>
                            <button className="mb-2 flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-base text-blue-600 hover:bg-blue-50">
                                <Heart className="h-5 w-5" />
                                Add to Watchlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Similar Items */}
                {/* <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <SimilarItems
                        title="Similar sponsored items"
                        products={similarProducts}
                    />
                </div> */}

                {/* Product Details Section */}
                <div className="mb-8">
                    <ProductSpecs
                        description={productInfo.description}
                        categoryName={productInfo.categoryName}
                        categoryDescription={productInfo.categoryDescription}
                        updateDate={updateDate}
                        productId={productInfo.id}
                    />
                </div>

                {/* Reviews Section */}
                {/* <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <Reviews
                        averageRating={4.8}
                        totalReviews={1847}
                        ratingDistribution={[1245, 458, 98, 32, 14]}
                        reviews={reviews}
                    />
                </div> */}

                {/* About this seller + Seller feedback */}
                <div className="bg-[#F7F7F7] px-5 py-5 grid grid-cols-1 gap-8 lg:grid-cols-12 mb-10">
                    <div className="lg:col-span-4">
                        <h1>About this seller</h1>

                    </div>
                    <div className="lg:col-span-8">
                        <h1>Feedback</h1>
                    </div>
                </div>

                {/* Seller Feedback Section */}
                {/* <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
                    <SellerFeedback {...sellerFeedback} />
                </div> */}
                <div className="mb-8 bg-[#F7F7F7] px-5 py-5">
                    <SellerFeedback
                        seller={sellerInfo.id}
                        product={productInfo.id}
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}
