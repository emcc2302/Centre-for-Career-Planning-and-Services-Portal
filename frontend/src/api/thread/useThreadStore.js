import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const useThreadStore = () => {
    const [loading, setLoading] = useState(false);
    const [threads, setThreads] = useState([]);
    const { backendUrl } = useAppContext();

    const getThreads = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/threads/getThreads`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ccps-token')}`
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setThreads(data.threads);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const createThread = async (threadData) => {
        const success = handleInputError(threadData);
        if (!success) return;

        if (threadData.file) {
            threadData.file = await convertToBase64(threadData.file);
        }

        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/threads/createThread`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ccps-token')}`
                },
                body: JSON.stringify(threadData)
            });

            if (!res.ok) {
                throw new Error(`Request failed with status: ${res.status}`);
            }

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || "Unknown error");
            }

            setThreads([...threads, data.newThread]);
            return true;
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const createComment = async (commentData) => {
        const success = handleInputError1(commentData);
        if (!success) return;

        if (commentData.file) {
            commentData.file = await convertToBase64(commentData.file);
        }

        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/api/threads/createComment/${commentData.threadId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ccps-token')}`
                },
                body: JSON.stringify(commentData)
            });

            if (!res.ok) {
                throw new Error(`Request failed with status: ${res.status}`);
            }

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || "Unknown error");
            }

            // setThreads((prevThreads) =>
            //     prevThreads.map((t) =>
            //         t._id === commentData.threadId
            //             ? { ...t, comments: [...t.comments, data.newComment] }
            //             : t
            //     )
            // );
            getThreads();

            return true;
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return { loading, threads, getThreads, createThread, createComment };
}

function handleInputError({ title, text }) {
    if (!title || !text) {
        toast.error('Fill out the required fields');
        return false;
    }
    return true;
}

function handleInputError1({ text, file, threadId }) {
    if (!text && !file) {
        toast.error('Empty comment');
        return false;
    }
    if (!threadId) {
        toast.error('Thread not found');
        return false;
    }
    return true;
}

export default useThreadStore;