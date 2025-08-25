import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function DropdownSelect({ select, setSelect }: any) {
    const [open, setOpen] = useState(false);
    const handleClick = (option: any) => {
        setSelect((prev: any) => ({
            ...prev,
            currentValue: option.value,
            currentIcon: option.icon,
        }));
        setOpen(false);
    };
    return (
        <div className="relative">
            {/* Button */}
            <button onClick={() => setOpen(!open)} className="flex justify-center items-center px-4 py-1 rounded-lg">
                <FontAwesomeIcon icon={select.currentIcon} className={` text-gray-500}`} />
            </button>

            {/* Dropdown options */}
            {open && (
                <ul className="absolute mt-2 w-full min-w-28 border rounded-lg bg-white shadow-lg z-10">
                    {select.options.map((option: any) => (
                        <li
                            key={option.value}
                            onClick={() => handleClick(option)}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                                select.currentValue === option.value ? 'bg-gray-200' : ''
                            }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
