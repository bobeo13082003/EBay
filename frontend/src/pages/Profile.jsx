import { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import {
    createAddress,
    deleteAddress,
    getAddresses,
    setDefaultAddress,
} from "../services/address";
import { getProfile, updateProfile } from "../services/authApi";

export default function Profile() {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState(null);

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        avatarURL: "",
    });

    const [loading, setLoading] = useState(true);

    // LOAD DATA (đặt trong useEffect để tránh lỗi hoisting)
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const userRes = await getProfile();
                const userData = userRes.data.data;

                setUser(userData);
                setForm({
                    username: userData.username || "",
                    email: userData.email || "",
                    avatarURL: userData.avatarURL || "",
                });

                const addrRes = await getAddresses();
                setAddresses(addrRes.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ADDRESS ACTIONS
    const fetchAddresses = async () => {
        const res = await getAddresses();
        setAddresses(res.data.data);
    };

    const handleAddAddress = async (address) => {
        await createAddress(address);
        setShowForm(false);
        fetchAddresses();
    };

    const setDefault = async (id) => {
        await setDefaultAddress(id);
        fetchAddresses();
    };

    const removeAddress = async (id) => {
        await deleteAddress(id);
        fetchAddresses();
    };

    // PROFILE ACTIONS
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(form);
            setEditMode(false);

            // reload user
            const res = await getProfile();
            setUser(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* PROFILE CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">

                        <img
                            src={
                                form.avatarURL ||
                                "https://via.placeholder.com/80"
                            }
                            className="w-16 h-16 rounded-full border object-cover"
                            alt="avatar"
                        />

                        {!editMode ? (
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {user?.username}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user?.email}
                                </p>
                            </div>
                        ) : (
                            <div className="flex-1 grid gap-2">
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded-lg text-sm"
                                    placeholder="Username"
                                />
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded-lg text-sm"
                                    placeholder="Email"
                                />
                                <input
                                    name="avatarURL"
                                    value={form.avatarURL}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded-lg text-sm"
                                    placeholder="Avatar URL"
                                />
                            </div>
                        )}

                        {/* ACTION */}
                        {!editMode ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleUpdateProfile}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="text-gray-500 text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ADDRESS HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Delivery Addresses
                    </h2>

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm"
                    >
                        + Add new address
                    </button>
                </div>

                {/* ADDRESS LIST */}
                <div className="grid gap-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            className="bg-white p-5 rounded-2xl shadow-sm flex justify-between hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {addr.fullName}

                                    {addr.isDefault && (
                                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                                            Default
                                        </span>
                                    )}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {addr.phone}
                                </p>

                                <p className="text-sm mt-1 text-gray-700">
                                    {addr.addressLine}, {addr.city},{" "}
                                    {addr.country}
                                </p>

                                {!addr.isDefault && (
                                    <button
                                        onClick={() =>
                                            setDefault(addr._id)
                                        }
                                        className="mt-3 text-sm text-blue-600 hover:underline"
                                    >
                                        Set as default
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => removeAddress(addr._id)}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* FORM ADD ADDRESS */}
                {showForm && (
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <AddressForm
                            onSubmit={handleAddAddress}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}