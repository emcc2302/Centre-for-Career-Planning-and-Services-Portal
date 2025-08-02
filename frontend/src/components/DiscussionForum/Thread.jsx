import React, { useState } from 'react'
import useThreadStore from '../../api/thread/useThreadStore'
import Comment from '../Comment'

const Thread = ({ thread, refreshThreads }) => {
  const { createComment, loading } = useThreadStore()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [file, setFile] = useState(null)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleAddComment = async (e) => {
    e.preventDefault()
    const commentData = {
      text: newComment,
      threadId: thread._id,
      file,
    }
    const success = await createComment(commentData)
    if (success) {
      setNewComment("")
      setFile(null)
      setShowCommentForm(false)
      refreshThreads()   // <--- trigger refresh of threads and comments
    }
  }

  const renderFile = () => {
    if (!thread.file) return null
    const isImage = thread.file.match(/\.(jpeg|jpg|png|gif)$/i)
    if (isImage) {
      return <img src={thread.file} alt="Thread Attachment" width={400} className="mt-3 rounded-md shadow-sm" />
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg p-4 min-h-[210px] flex flex-col shadow border border-gray-100">
      <h3 className="text-base font-semibold text-gray-900">{thread.title}</h3>
      <div className="mt-2 flex-1 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-gray-700 text-sm">{thread.text}</p>
        {renderFile()}
      </div>
      <div className="flex flex-col items-end mt-3">
        <span className="text-xs text-gray-500 font-medium mb-1">
          Author: {thread.author.name}
        </span>
        <button
          className="px-4 py-1.5 text-xs font-medium rounded transition bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          onClick={() => setShowComments(!showComments)}
          type="button"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-2">
          {thread.comments.length > 0 ? (
            thread.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} threadAuthor={thread.author._id} />
            ))
          ) : (
            <p className="text-gray-500 text-xs">No comments yet.</p>
          )}

          <button
            className="mt-2 px-3 py-1 text-xs bg-emerald-100 text-emerald-700 font-medium rounded hover:bg-emerald-200 transition"
            onClick={() => setShowCommentForm(!showCommentForm)}
            type="button"
          >
            {showCommentForm ? "Cancel" : "Add Comment"}
          </button>

          {showCommentForm && (
            <form onSubmit={handleAddComment} className="mt-2 flex flex-col gap-2 rounded-md bg-emerald-50 p-3">
              <textarea
                className="w-full p-2 border border-gray-200 rounded-md focus:border-emerald-400 focus:ring-emerald-100 text-sm"
                rows="2"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <input
                type="file"
                className="text-xs"
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                onChange={handleFileChange}
              />
              <button
                type='submit'
                disabled={loading}
                className="self-end mt-1 px-4 py-1 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 transition"
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
