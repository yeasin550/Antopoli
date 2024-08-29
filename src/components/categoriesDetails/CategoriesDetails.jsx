"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const CategoriesDetails = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch("https://antopoli-server.vercel.app/animals");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAnimals(data);
            } catch (error) {
                console.error("Failed to fetch animals data:", error);
            }
        };


        fetchAnimals();
    }, [animals]); // Empty dependency array


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://antopoli-server.vercel.app/animals/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal._id !== id));
                console.log("Animal deleted successfully");
            } else {
                console.error("Failed to delete animal");
            }
        } catch (error) {
            console.error("Error deleting animal:", error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mt-16">
                {animals?.map((animal) => (
                    <div key={animal._id} className="relative group">
                        <Image
                            src={animal.animalImage}
                            alt={animal.animalName}
                            width={400}
                            height={400}
                            className="w-64"
                        />
                        <h1 className="text-white flex items-center justify-center mt-3">
                            {animal.animalName}
                        </h1>
                        <button
                            onClick={() => handleDelete(animal._id)}
                            className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-trash"
                            >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6l-1 14H6L5 6"></path>
                                <path d="M10 11v6"></path>
                                <path d="M14 11v6"></path>
                                <path d="M9 3h6v3H9z"></path>
                            </svg>
                        </button>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default CategoriesDetails;
