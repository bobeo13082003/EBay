import { useState, useEffect, useCallback } from "react"
import {
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
    ArrowRight
} from "lucide-react"

const slides = [
    {
        id: 1,
        title: "Shop. Work. Play.",
        subtitle:
            "Discover the latest computers and electronics at unbeatable prices",
        category: "Computers & Tech",
        mainImage:
            "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzE4Njc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage1:
            "https://images.unsplash.com/photo-1769603891182-0316b20ce2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBkaWdpdGFsJTIwc2NyZWVufGVufDF8fHx8MTc3MTkwODY3MHww&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage2:
            "https://images.unsplash.com/photo-1646719223599-9864b351e242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwZGV2aWNlfGVufDF8fHx8MTc3MTgyNzg5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "bg-blue-600"
    },
    {
        id: 2,
        title: "Capture. Create. Share.",
        subtitle:
            "Professional cameras and photography equipment for every skill level",
        category: "Cameras & Photo",
        mainImage:
            "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzE4Njc1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage1:
            "https://images.unsplash.com/photo-1770365297537-1b95d6000492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBsZW5zJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MTg3ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage2:
            "https://images.unsplash.com/photo-1697122235975-8cb2d056aed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZseWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxODQyODkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "bg-indigo-600"
    },
    {
        id: 3,
        title: "Listen. Game. Connect.",
        subtitle:
            "Premium audio and gaming gear for the ultimate entertainment experience",
        category: "Entertainment & Gaming",
        mainImage:
            "https://images.unsplash.com/photo-1764557159396-419b85356035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW8lMjBwcmVtaXVtfGVufDF8fHx8MTc3MTkwODY3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage1:
            "https://images.unsplash.com/photo-1695028644151-1ec92bae9fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NzE4Mzk4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage2:
            "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMHNwZWFrZXIlMjBwb3J0YWJsZXxlbnwxfHx8fDE3NzE4MTk3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "bg-purple-600"
    },
    {
        id: 4,
        title: "Upgrade. Customize. Dominate.",
        subtitle:
            "Build your perfect setup with cutting-edge peripherals and accessories",
        category: "Tech Accessories",
        mainImage:
            "https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlib2FyZCUyMG1lY2hhbmljYWwlMjBnYW1pbmd8ZW58MXx8fHwxNzcxODk0NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage1:
            "https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc3MTg3MzA5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        floatingImage2:
            "https://images.unsplash.com/photo-1649704394792-9cd6a3995cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25pdG9yJTIwZGlzcGxheSUyMHNjcmVlbnxlbnwxfHx8fDE3NzE4NTgzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bgColor: "bg-blue-700"
    }
]

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
    }, [])

    const previousSlide = useCallback(() => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    }, [])

    const goToSlide = useCallback(index => {
        setCurrentSlide(index)
    }, [])

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev)
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(nextSlide, 5000)
            return () => clearInterval(interval)
        }
    }, [isPaused, nextSlide])

    // Keyboard accessibility
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === "ArrowLeft") {
                previousSlide()
            } else if (e.key === "ArrowRight") {
                nextSlide()
            } else if (e.key === " ") {
                e.preventDefault()
                togglePause()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [nextSlide, previousSlide, togglePause])

    const activeSlide = slides[currentSlide]

    return (
        <div className="bg-white py-4 md:py-8">
            <div className="mx-auto max-w-[1400px] px-4">
                <div
                    className={`relative overflow-hidden rounded-2xl ${activeSlide.bgColor} px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 transition-colors duration-500`}
                >
                    {/* Main Content Grid */}
                    <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Left Column - Text Content */}
                        <div className="flex flex-col justify-center text-white">
                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                {activeSlide.title}
                            </h1>
                            <p className="mb-8 text-lg text-white/90 md:text-xl">
                                {activeSlide.subtitle}
                            </p>
                            <div>
                                <button className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-50 hover:shadow-lg">
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Product Images */}
                        <div className="relative flex items-center justify-center">
                            <div className="relative h-[300px] w-full md:h-[400px]">
                                {/* Main Product Image */}
                                <div className="absolute left-1/2 top-1/2 z-10 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 md:h-[320px] md:w-[320px]">
                                    <img
                                        src={activeSlide.mainImage}
                                        alt={activeSlide.category}
                                        className="h-full w-full rounded-2xl object-cover shadow-2xl transition-opacity duration-500"
                                    />
                                </div>

                                {/* Floating Image 1 - Top Left */}
                                <div className="absolute left-0 top-0 z-0 h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
                                    <img
                                        src={activeSlide.floatingImage1}
                                        alt="Product 1"
                                        className="h-full w-full rounded-xl object-cover shadow-xl transition-opacity duration-500"
                                    />
                                </div>

                                {/* Floating Image 2 - Bottom Right */}
                                <div className="absolute bottom-0 right-0 z-0 h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
                                    <img
                                        src={activeSlide.floatingImage2}
                                        alt="Product 2"
                                        className="h-full w-full rounded-xl object-cover shadow-xl transition-opacity duration-500"
                                    />
                                </div>
                            </div>

                            {/* Category Label */}
                            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-lg md:bottom-0">
                                <span>{activeSlide.category}</span>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Controls Container */}
                    <div className="relative z-20 mt-12 flex items-center justify-between md:mt-16">
                        {/* Pagination Dots - Center */}
                        <div className="absolute left-1/2 flex -translate-x-1/2 gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === index
                                            ? "w-8 bg-white"
                                            : "bg-white/50 hover:bg-white/75"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Control Buttons - Right */}
                        <div className="ml-auto flex gap-2">
                            <button
                                onClick={previousSlide}
                                aria-label="Previous slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                            <button
                                onClick={togglePause}
                                aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                            >
                                {isPaused ? (
                                    <Play className="h-5 w-5" />
                                ) : (
                                    <Pause className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
