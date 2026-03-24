import { useState } from "react";
import { toastError } from "../utils/toast";

export default function AddressForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        country: "",
        isDefault: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = () => {
        if (
            !form.fullName ||
            !form.phone ||
            !form.addressLine ||
            !form.city ||
            !form.country
        ) {
            toastError("Please fill all required fields");
            return;
        }
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Add address</h2>

                <div className="space-y-3">
                    <input
                        name="fullName"
                        placeholder="Full name"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        name="phone"
                        placeholder="Phone number"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        name="addressLine"
                        placeholder="Street address"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        name="city"
                        placeholder="City"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                    <input
                        name="country"
                        placeholder="Country"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="isDefault"
                            onChange={handleChange}
                        />
                        Set as default address
                    </label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
