import React, { FC, useState } from "react";
import "./App.css";

interface Job {
    title: string;
    company: string;
    type: string;
    location: string;
    tags: string[];
    logoUrl: string;
    isNew: boolean;
    isFeatured: boolean;
}

const App: FC = () => {
    const [jobListings, setJobListings] = useState<Job[]>(() => {
        const savedJobs = localStorage.getItem("jobListings");
        return savedJobs ? JSON.parse(savedJobs) : [];
    });

    const [formData, setFormData] = useState<{
        logoUrl: string;
        company: string;
        title: string;
        type: string;
        location: string;
        tags: string[];
        isNew: boolean;
        isFeatured: boolean;
    }>({
        logoUrl: '',
        company: '',
        title: '',
        type: 'Tanlang',
        location: 'Tanlang',
        tags: [],
        isNew: false,
        isFeatured: false,
    });

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTagChange = (tag: string) => {
        setFormData((prev) => {
            const tags = prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag];
            return { ...prev, tags };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, company, type, location } = formData;
        if (!title || !company || type === "Tanlang" || location === "Tanlang") {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
            return;
        }
        const newJob: Job = { ...formData };
        const updatedJobListings = [...jobListings, newJob];
        setJobListings(updatedJobListings);
        localStorage.setItem("jobListings", JSON.stringify(updatedJobListings));
        setFormData({
            logoUrl: "",
            company: "",
            title: "",
            type: "Tanlang",
            location: "Tanlang",
            tags: [],
            isNew: false,
            isFeatured: false,
        });
        setIsModalVisible(false);
    };

    return (
        <div className="mx-auto p-5 bg-gray-100">
            <header className="bg-teal-500 text-white p-4 rounded-lg mb-5">
                <h1 className="text-2xl font-bold">Job Listings</h1>
                <p className="text-sm">Find your dream job</p>
            </header>

            <button
                onClick={() => setIsModalVisible(true)}
                className="bg-teal-500 text-white rounded p-2 mb-5"
            >
                +
            </button>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Vakansiya ma'lumotlarini kiriting
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {["logoUrl", "company", "title"].map((field) => (
                                <div className="mb-4" key={field}>
                                    <label className="block mb-1">
                                        {field === "logoUrl"
                                            ? "Logotip URL"
                                            : field === "company"
                                            ? "Kompaniya nomi"
                                            : "Lavozim"}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={handleChange}
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                            ))}
                            <div className="mb-4">
                                <label className="block mb-1">Vaqt</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="border rounded w-full p-2"
                                >
                                    <option value="Tanlang">Tanlang</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Joylashuv</label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="border rounded w-full p-2"
                                >
                                    <option value="Tanlang">Tanlang</option>
                                    <option value="USA only">USA only</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Worldwide">Worldwide</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Ko'nikmalar</label>
                                {["Fullstack", "Midweight", "Python", "React"].map(
                                    (tag) => (
                                        <label key={tag} className="block">
                                            <input
                                                type="checkbox"
                                                checked={formData.tags.includes(tag)}
                                                onChange={() => handleTagChange(tag)}
                                            />
                                            {tag}
                                        </label>
                                    )
                                )}
                            </div>
                            <div className="mb-4">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isNew"
                                        checked={formData.isNew}
                                        onChange={handleChange}
                                    />{" "}
                                    Yangi
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={handleChange}
                                    />{" "}
                                    Featured
                                </label>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-black text-white rounded p-2"
                                >
                                    Saqlash
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalVisible(false)}
                                    className="bg-gray-300 text-black rounded p-2"
                                >
                                    Yopish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {jobListings.map((job, index) => (
                <div
                    className="bg-white rounded-lg p-5 shadow-md mb-5 flex items-center justify-between w-full"
                    key={index}
                >
                    <div className="flex items-center">
                        <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mr-4">
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <p className="text-gray-600">
                                {job.type} - {job.location}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {job.isNew && (
                            <span className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-sm mr-2">
                                NEW!
                            </span>
                        )}
                        {job.isFeatured && (
                            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">
                                FEATURED
                            </span>
                        )}
                    </div>
                    <div className="mt-2">
                        {job.tags.map((tag, i) => (
                            <span
                                className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-sm mr-2"
                                key={i}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
