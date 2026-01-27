import { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import {
    createAddress,
    deleteAddress,
    getAddresses,
    setDefaultAddress,
} from "../services/address";

export default function Profile() {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // load once
    useEffect(() => {
        const loadAddresses = async () => {
            const res = await getAddresses();
            setAddresses(res.data.data);
        };
        loadAddresses();
    }, []);

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

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div
                        key={addr._id}
                        className="border rounded-lg p-4 flex justify-between"
                    >
                        <div>
                            <p className="font-medium">
                                {addr.fullName}
                                {addr.isDefault && (
                                    <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded">
                                        Default
                                    </span>
                                )}
                            </p>

                            <p className="text-sm text-gray-600">{addr.phone}</p>

                            <p className="text-sm">
                                {addr.addressLine}, {addr.city}, {addr.country}
                            </p>

                            {!addr.isDefault && (
                                <button
                                    onClick={() => setDefault(addr._id)}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
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

            <button
                onClick={() => setShowForm(true)}
                className="mt-6 bg-black text-white px-6 py-2 rounded-full"
            >
                Add new address
            </button>

            {showForm && (
                <AddressForm
                    onSubmit={handleAddAddress}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
