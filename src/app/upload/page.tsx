"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, Image, Video, X, Check, FileImage, FileVideo, Loader2 } from "lucide-react";

export default function UploadPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const categories = ["Nature", "Wildlife", "Urban", "Portrait", "Abstract", "Other"];

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    }, []);

    const handleFiles = (newFiles: File[]) => {
        // Filter valid files
        const validFiles = newFiles.filter((file) => {
            if (mediaType === "photo") {
                return file.type.startsWith("image/");
            } else {
                return file.type.startsWith("video/");
            }
        });

        if (validFiles.length === 0) {
            alert(`Please upload ${mediaType === "photo" ? "image" : "video"} files only.`);
            return;
        }

        setFiles((prev) => [...prev, ...validFiles]);

        // Create previews
        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews((prev) => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Please select at least one file to upload.");
            return;
        }

        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        setIsUploading(true);

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsUploading(false);
        setUploadSuccess(true);

        // Reset after success
        setTimeout(() => {
            router.push("/gallery");
        }, 2000);
    };

    if (uploadSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center py-8 px-4">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-scaleIn">
                        <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Upload Successful!</h2>
                    <p className="text-gray-400">Redirecting to gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Upload Media
                        </h1>
                    </div>
                    <p className="text-gray-400">
                        Share your amazing photos and videos with the world
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Media Type Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setMediaType("photo");
                                setFiles([]);
                                setPreviews([]);
                            }}
                            className={`p-6 rounded-2xl border-2 transition-all duration-200 ${mediaType === "photo"
                                    ? "border-purple-500 bg-purple-500/10"
                                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                                }`}
                        >
                            <Image className={`w-8 h-8 mx-auto mb-3 ${mediaType === "photo" ? "text-purple-400" : "text-gray-400"}`} />
                            <p className={`font-semibold ${mediaType === "photo" ? "text-white" : "text-gray-300"}`}>Photos</p>
                            <p className="text-sm text-gray-500">JPG, PNG, WebP</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMediaType("video");
                                setFiles([]);
                                setPreviews([]);
                            }}
                            className={`p-6 rounded-2xl border-2 transition-all duration-200 ${mediaType === "video"
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                                }`}
                        >
                            <Video className={`w-8 h-8 mx-auto mb-3 ${mediaType === "video" ? "text-blue-400" : "text-gray-400"}`} />
                            <p className={`font-semibold ${mediaType === "video" ? "text-white" : "text-gray-300"}`}>Videos</p>
                            <p className="text-sm text-gray-500">MP4, WebM, MOV</p>
                        </button>
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`relative p-8 md:p-12 rounded-2xl border-2 border-dashed transition-all duration-200 ${dragActive
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-gray-700 bg-gray-800/20 hover:border-gray-600"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={mediaType === "photo" ? "image/*" : "video/*"}
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                        />

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-700/50 flex items-center justify-center">
                                {mediaType === "photo" ? (
                                    <FileImage className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <FileVideo className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <p className="text-lg font-medium text-white mb-2">
                                Drag and drop your {mediaType}s here
                            </p>
                            <p className="text-gray-400 mb-4">or</p>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200"
                            >
                                Browse Files
                            </button>
                        </div>
                    </div>

                    {/* File Previews */}
                    {previews.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Selected Files ({files.length})</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-800">
                                        {mediaType === "photo" ? (
                                            <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <video src={preview} className="w-full h-full object-cover" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata Form */}
                    <div className="space-y-6 p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a title for your media"
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a description (optional)"
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading || files.length === 0}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Upload {files.length > 0 ? `${files.length} ${mediaType}${files.length > 1 ? "s" : ""}` : "Media"}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
