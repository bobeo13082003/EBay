import {
    Smartphone,
    Laptop,
    Watch,
    Camera,
    Home,
    Shirt,
    Gamepad2,
    Music
} from "lucide-react"

const categories = [
    { name: "Electronics", icon: Smartphone },
    { name: "Computers", icon: Laptop },
    { name: "Fashion", icon: Shirt },
    { name: "Home & Garden", icon: Home },
    { name: "Watches", icon: Watch },
    { name: "Cameras", icon: Camera },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Music", icon: Music }
]

export function FeaturedCategories() {
    return (
        <div className="bg-white py-8">
            <div className="mx-auto max-w-[1400px] px-4">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Explore Popular Categories
                </h2>
                <div className="grid grid-cols-4 gap-6 md:grid-cols-8">
                    {categories.map(({ name, icon: Icon }) => (
                        <a
                            key={name}
                            href="#"
                            className="flex flex-col items-center gap-3 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <Icon className="h-8 w-8 text-gray-700" />
                            </div>
                            <span className="text-center text-sm text-gray-700">{name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
