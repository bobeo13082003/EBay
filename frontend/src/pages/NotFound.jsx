import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
            <h1 className="text-7xl font-bold text-blue-600">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Trang không tồn tại
            </h2>

            <p className="mt-2 text-gray-500 max-w-md">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>

            <Link
                to="/home"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
                Quay về trang chủ
            </Link>
        </div>
    );
}

export default NotFound;
