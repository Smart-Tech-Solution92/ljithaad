import { getDB } from "../db";
import { Post, Comment } from "../../type/post";
import { ObjectId } from "mongodb";

export async function getPostCollection() {
  const db = await getDB();
  return db.collection<Post>("posts");
}

export async function getCommentCollection() {
  const db = await getDB();
  return db.collection<Comment>("comments");
}


export async function createPost(post: Omit<Post, "_id">) {
  const col = await getPostCollection();
  post.likes = [];
  post.dislikes = [];
  post.viewCount = 0;
  post.reports = [];
  post.isRemoved = false;
  post.createdAt = new Date();
  post.updatedAt = new Date();
  const result = await col.insertOne(post);
  return result.insertedId;
}

export async function getPosts(channelSlug?: string) {
  const col = await getPostCollection();
  const query: any = { isRemoved: { $ne: true } };
  if (channelSlug) query.channelSlug = channelSlug;
  return col.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getPostById(postId: string) {
  const col = await getPostCollection();
  return col.findOne({ _id: new ObjectId(postId), isRemoved: { $ne: true } });
}

export async function incrementPostView(postId: string) {
  const col = await getPostCollection();
  await col.updateOne({ _id: new ObjectId(postId) }, { $inc: { viewCount: 1 } });
}

export async function addComment(comment: Omit<Comment, "_id">) {
  const col = await getCommentCollection();
  comment.likes = [];
  comment.dislikes = [];
  comment.createdAt = new Date();
  comment.updatedAt = new Date();
  return col.insertOne(comment);
}

export async function getCommentsByPost(postId: string) {
  const col = await getCommentCollection();
  return col.find({ postId: new ObjectId(postId) }).sort({ createdAt: 1 }).toArray();
}

export async function softDeleteComment(commentId: string) {
  const col = await getCommentCollection();
  await col.updateOne({ _id: new ObjectId(commentId) }, { $set: { deletedAt: new Date() } });
}

export async function toggleReaction(type: "post" | "comment", id: string, userId: string, reaction: "like" | "dislike") {
  const col = type === "post" ? await getPostCollection() : await getCommentCollection();
  const objId = new ObjectId(id);
  const item = await col.findOne({ _id: objId });
  if (!item) throw new Error(`${type} not found`);

  const likes = item.likes || [];
  const dislikes = item.dislikes || [];

  if (reaction === "like") {
    if (!likes.includes(userId)) likes.push(userId);
    const index = dislikes.indexOf(userId);
    if (index > -1) dislikes.splice(index, 1);
  } else {
    if (!dislikes.includes(userId)) dislikes.push(userId);
    const index = likes.indexOf(userId);
    if (index > -1) likes.splice(index, 1);
  }

  await col.updateOne({ _id: objId }, { $set: { likes, dislikes, updatedAt: new Date() } });
  return { likes, dislikes };
}
