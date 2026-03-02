import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProductGallery({ images }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handlePrevious = () => {
        setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="flex gap-4">
            {/* Thumbnail List */}
            <div className="flex flex-col gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`h-24 w-24 flex-shrink-0 rounded-2xl border-2 ${selectedIndex === index
                            ? "border-gray-800"
                            : "border-gray-200 hover:border-gray-400"
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full rounded-2xl object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <img
                        src={images[selectedIndex]}
                        alt="Product"
                        className="h-full w-full object-contain"
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-700" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-700" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            </div>
        </div>
    )
}
