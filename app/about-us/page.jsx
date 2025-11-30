"use client";

import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        setUrl("");
    };

    // handle upload with fetch()
    const handleUpload = async () => {
        if (!file) {
            alert("Please select an image first!");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        console.log('formdata is before api call', formData);
        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setUrl(data.url);

                console.log("✅ Upload success:", data.url);
            } else {

                console.log(data.message);
                // alert("Upload failed: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            // console.error("❌ Upload error:", err?.message);
            console.log('error', err)
            // alert("Something went wrong. Check console.");
        } finally {
            setLoading(false);
        }
    };


    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            console.log("Copied:", url);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center w-[320px]">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                    Cloudinary Upload Test
                </h2>

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 w-full rounded"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`mt-4 px-4 py-2 rounded text-white w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>

                <div className="w-fit flex items-center gap-2">
                    <p className="w-fit">{url && url}</p>
                    <button
                        onClick={copyToClipboard}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        Copy
                    </button>
                </div>

                {url && (
                    <div className="mt-5">
                        <p className="text-sm text-gray-600 mb-2">Uploaded File:</p>

                        {/* Check if the file is an image or video */}
                        {url.match(/\.(jpeg|jpg|png|gif|webp|avif)$/i) ? (
                            <img
                                src={url}
                                alt="Uploaded"
                                className="rounded-md border w-64"
                            />
                        ) : url.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                                controls
                                className="rounded-md border w-64"
                            >
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm"
                            >
                                View file
                            </a>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
