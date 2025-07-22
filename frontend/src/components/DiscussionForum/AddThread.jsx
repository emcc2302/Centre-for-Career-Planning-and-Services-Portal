import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import useThreadStore from '../../api/thread/useThreadStore';
import toast from 'react-hot-toast';

const AddThread = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);

    const { setShowAddThread } = useAppContext();

    const { createThread, loading } = useThreadStore();

    const handleThreadSubmit = async (e) => {
        e.preventDefault();
        const result = await createThread({ title, text: description, file: fileInputRef.current.files[0] });
        if (result) {
            toast.success("Thread created successfully");
            setShowAddThread(false);
            setTitle("");
            setDescription("");
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            return document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={handleThreadSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[80vh]">
                <h2 className="text-lg font-bold mb-4">Create New Thread</h2>
                <div>
                    <label htmlFor="title"><span className='text-red-500'>*</span>Title: </label>
                    <input
                        type="text"
                        id='title'
                        placeholder="Enter thread title..."
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description"><span className='text-red-500'>*</span>Description: </label>
                    <textarea
                        id='description'
                        type="text"
                        placeholder="Enter thread description..."
                        className="w-full p-2 border rounded"
                        value={description}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="file">File (Image): </label>
                    {/* image for just now, maybe we can modify it later for more file types */}
                    <input
                        type="file"
                        accept='image/*'
                        id='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                    <button disabled={loading} className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setShowAddThread(false)}>
                        Cancel
                    </button>
                    <button disabled={loading} type='submit' className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        {!loading ? 'Create' : 'Submitting...'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddThread