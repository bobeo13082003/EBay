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
        createdAt,
        updatedAt
    } = product

    const updateDate = updatedAt ?? createdAt

    const productImages = images || []
    const sellerInfo = {
        id: product?.sellerId?._id,
        username: product?.sellerId?.username,
        avatarUrl: product?.sellerId?.avatarURL
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
                            {!sellerInfo.avatarUrl ? (
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 text-sm font-semibold">
                                        {sellerInfo?.username?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                            ) : (
                                <img
                                    src={sellerInfo.avatarUrl}
                                    alt={title}
                                    className="w-12 h-12 rounded-full"
                                />
                            )}

                            <div className="flex flex-col gap-1">
                                <span className="text-base font-bold text-gray-800">
                                    {sellerInfo.username}
                                </span>

                                <Link className="text-base text-gray-800 underline hover:text-gray-500 cursor-pointer">
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

                {/* About this seller + Seller feedback */}
                <div className="mb-8 bg-[#F7F7F7] px-12 py-10">
                    <SellerFeedback
                        sellerId={sellerInfo.id}
                        productId={productInfo.id}
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}
