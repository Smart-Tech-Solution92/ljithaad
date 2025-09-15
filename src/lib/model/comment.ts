import { ObjectId } from "mongodb";
import { getDB } from "../db";
import { Comment } from "../../type/comment";

// Get comment collection
export async function getCommentCollection() {
  const db = await getDB();
  return db.collection<Comment>("comments");
}

// Add a new comment
export async function addComment(comment: Omit<Comment, "_id" | "createdAt" | "updatedAt" | "likes" | "dislikes">) {
  const col = await getCommentCollection();

  const newComment: Comment = {
    ...comment,
    _id: new ObjectId(),         // generate ObjectId
    likes: [],
    dislikes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(newComment);
  return result.insertedId;
}

// Get all comments for a post
export async function getCommentsByPost(postId: ObjectId | string) {
  const col = await getCommentCollection();

  const postObjectId = typeof postId === "string" ? new ObjectId(postId) : postId;

  return col
    .find({ postId: postObjectId, deletedAt: { $exists: false } })
    .sort({ createdAt: 1 })
    .toArray();
}

// Soft delete a comment
export async function softDeleteComment(commentId: ObjectId | string) {
  const col = await getCommentCollection();
  const commentObjectId = typeof commentId === "string" ? new ObjectId(commentId) : commentId;

  await col.updateOne(
    { _id: commentObjectId },
    { $set: { deletedAt: new Date(), updatedAt: new Date() } }
  );
}

// Toggle like or dislike
export async function toggleReaction(commentId: ObjectId | string, userId: string, reaction: "like" | "dislike") {
  const col = await getCommentCollection();
  const commentObjectId = typeof commentId === "string" ? new ObjectId(commentId) : commentId;

  const comment = await col.findOne({ _id: commentObjectId });
  if (!comment) throw new Error("Comment not found");

  const likes = comment.likes || [];
  const dislikes = comment.dislikes || [];

  if (reaction === "like") {
    if (!likes.includes(userId)) likes.push(userId);
    const index = dislikes.indexOf(userId);
    if (index > -1) dislikes.splice(index, 1);
  } else {
    if (!dislikes.includes(userId)) dislikes.push(userId);
    const index = likes.indexOf(userId);
    if (index > -1) likes.splice(index, 1);
  }

  await col.updateOne(
    { _id: commentObjectId },
    { $set: { likes, dislikes, updatedAt: new Date() } }
  );

  return { likes, dislikes };
}
