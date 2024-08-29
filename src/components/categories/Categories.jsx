"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Categories = () => {
    const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const modalRef = useRef(null);

    const uploadImageToImgbb = async (image) => {
        const formData = new FormData();
        formData.append("image", image[0]);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });


        const data = await res.json();
        return data.data.url;
    };

    const onSubmitAnimal = async (data) => {
        try {
            const imageUrl = await uploadImageToImgbb(data.animalImage);
            const response = await fetch("https://antopoli-server.vercel.app/animals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ animalName: data.animalName, animalImage: imageUrl }),
            });

            if (response.ok) {
                toast.success("Animal created successfully");
            } else {
                toast.error("Failed to create animal");
            }
        } catch (error) {
            toast.error("Error: " + error.message);
        }

        reset();
        setIsAnimalModalOpen(false);
    };

    const onSubmitCategory = async (data) => {
        try {
            const response = await fetch("https://antopoli-server.vercel.app/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryName: data.categoryName }),
            });

            if (response.ok) {
                toast.success("Category created successfully");
            } else {
                toast.error("Failed to create category");
            }
        } catch (error) {
            toast.error("Error: " + error.message);
        }

        reset();
        setIsCategoryModalOpen(false);
    };


    // Inside your useEffect hook
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsAnimalModalOpen(false);
                setIsCategoryModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAnimalModalOpen, isCategoryModalOpen]);

    // categories data
    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await fetch("https://antopoli-server.vercel.app/categories");
    //             const data = await response.json();
    //             setCategories(data);
    //         } catch (error) {
    //             console.error("Error fetching categories:", error);
    //         }
    //     };

    //     fetchCategories();
    // }, [categories]);

    return (
        <div className="">
            <div className="md:flex justify-between">
                {/* <div className="flex gap-3">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="border border-green-500 text-green-500 hover:text-white px-6 py-3 rounded-full hover:bg-blue-600"
                        >
                            {category.categoryName}
                        </button>
                    ))}
                </div> */}
                <div className="md:flex gap-3">
                    <button className=" border border-green-500 text-green-500 hover:text-white px-6 py-3 rounded-full hover:bg-blue-600">
                        Land Animal
                    </button>
                    <button className=" border border-red-500 duration-500 text-red-500 hover:text-white px-7 py-3 rounded-full hover:bg-green-600">
                        Bird
                    </button>
                    <button className=" border border-red-500 duration-500 text-red-500 hover:text-white px-7 py-3 rounded-full hover:bg-yellow-600">
                        Fish
                    </button>
                    <button className=" border border-red-500 duration-500 text-red-500 hover:text-white px-7 py-3 rounded-full hover:bg-red-600">
                        Insect
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        className="border duration-500 text-white px-6 py-3 rounded-full hover:bg-purple-600"
                        onClick={() => setIsAnimalModalOpen(true)}
                    >
                        Add Animal
                    </button>
                    <button
                        className="border duration-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600"
                        onClick={() => setIsCategoryModalOpen(true)}
                    >
                        Add Category
                    </button>
                </div>
            </div>
            <ToastContainer />
            {/* Animal Modal */}
            {isAnimalModalOpen && (
                <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Add Animal</h2>
                        <form onSubmit={handleSubmit(onSubmitAnimal)}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Animal Name"
                                    {...register("animalName", { required: true })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {errors.animalName && (
                                    <p className="text-red-500 text-sm mt-1">Animal Name is required</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Animal Image
                                </label>
                                <input
                                    type="file"
                                    {...register("animalImage", { required: true })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {errors.animalImage && (
                                    <p className="text-red-500 text-sm mt-1">Animal Image is required</p>
                                )}
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-purple-600 w-full"
                                >
                                    Create Animal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                        <form onSubmit={handleSubmit(onSubmitCategory)}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    {...register("categoryName", { required: true })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.categoryName && (
                                    <p className="text-red-500 text-sm mt-1">Category Name is required</p>
                                )}
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-purple-600 w-full"
                                >
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
