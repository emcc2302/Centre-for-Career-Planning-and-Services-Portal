import React, { useState } from 'react'
import useThreadStore from '../../api/thread/useThreadStore';
import Comment from '../Comment';

const Thread = ({ thread }) => {
  const { createComment, loading } = useThreadStore();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentData = {
      text: newComment,
      threadId: thread._id,
      file,
    };
    const success = await createComment(commentData);
    if (success) {
      setNewComment("");
      setFile(null);
      setShowCommentForm(false);
    }
  }



  const renderFile = () => {
    if (!thread.file) return null;

    const isImage = thread.file.match(/\.(jpeg|jpg|png|gif)$/i);

    if (isImage) {
      return <img src={thread.file} alt="Thread Attachment" width={400} />;
    }
    return null;
  };



  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm  bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{thread.title}</h3>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className="text-gray-700">{thread.text}</p>
        {renderFile()}
      </div>

      <div className='flex flex-col items-end mt-5'>
        <p className="text-sm text-gray-500 font-medium">Author: {thread.author.name }</p>

        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComments && (
        <div className="mt-3 space-y-2">
          {thread.comments.length > 0 ? (
            thread.comments.map((comment) => <Comment key={comment._id} comment={comment} threadAuthor={thread.author._id} />)
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            {showCommentForm ? "Cancel" : "Add Comment"}
          </button>

          {showCommentForm && (
            <form onSubmit={handleAddComment} className="mt-2 flex flex-col space-y-2">
              <textarea
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <input
                type="file"
                className="p-1"
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                onChange={handleFileChange}
              />
              <button
                type='submit'
                disabled={loading}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Thread