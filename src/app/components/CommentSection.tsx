"use client";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comment?postId=${postId}`);
        const json = await res.json();
        setComments(json.comments);
      } catch (err) {
        console.error("Error loading comments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        content: newComment,
        author: "Guest", // later replace with logged-in user
      }),
    });

    const data = await res.json();
    setComments((prev) => [...prev, data.comment]);
    setNewComment("");
  }

  return (
    <div className="mt-6 bg-white p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="border-b pb-2">
              <p className="text-sm text-gray-700">{c.content}</p>
              <span className="text-xs text-gray-500">
                by {c.author} • {new Date(c.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-2">
        <textarea
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="self-end bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
