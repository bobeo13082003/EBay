export default function TextInput({
    label,
    type = "text",
    name,
    value,
    onChange,
}) {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="
                    peer w-full rounded-md border border-gray-400 bg-white
                    px-4 pt-5 pb-2 text-sm text-gray-900
                    focus:border-black focus:outline-none
                "
            />
            <label
                className="
                    absolute left-4 top-3 text-sm text-gray-500
                    transition-all duration-200
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                    peer-valid:-top-2 peer-valid:text-xs
                    bg-white px-1
                "
            >
                {label}
            </label>
        </div>
    );
}
