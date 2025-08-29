import { NextResponse } from "next/server";
import { getPostCollection, getCommentCollection } from "../../../lib/model/post";
import { ObjectId } from "mongodb";


async function createPost(data: any) {
  const col = await getPostCollection();
  const now = new Date();
  const post = {
    channelSlug: data.channelSlug,
    title: data.title,
    content: data.content,
    createdBy: data.createdBy,
    images: data.images || [],
    tags: data.tags || [],
    flair: data.flair,
    likes: [],
    dislikes: [],
    viewCount: 0,
    reports: [],
    isRemoved: false,
    createdAt: now,
    updatedAt: now,
  };
  const result = await col.insertOne(post);
  return result.insertedId;
}

async function getPosts(channelSlug?: string) {
  const col = await getPostCollection();
  const query: any = { isRemoved: { $ne: true } };
  if (channelSlug) query.channelSlug = channelSlug;
  return col.find(query).sort({ createdAt: -1 }).toArray();
}

async function getPostById(postId: string) {
  const col = await getPostCollection();
  return col.findOne({ _id: new ObjectId(postId), isRemoved: { $ne: true } });
}

async function incrementPostView(postId: string) {
  const col = await getPostCollection();
  await col.updateOne({ _id: new ObjectId(postId) }, { $inc: { viewCount: 1 } });
  return getPostById(postId);
}

async function addComment(data: any) {
  const col = await getCommentCollection();
  const comment = {
    postId: new ObjectId(data.postId),
    parentId: data.parentId ? new ObjectId(data.parentId) : undefined,
    content: data.content,
    createdBy: data.createdBy,
    likes: [],
    dislikes: [],
    reports: [],
    deletedAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await col.insertOne(comment);
  return result.insertedId;
}

async function getComments(postId: string) {
  const col = await getCommentCollection();
  return col.find({ postId: new ObjectId(postId) }).sort({ createdAt: 1 }).toArray();
}

async function softDeleteComment(commentId: string) {
  const col = await getCommentCollection();
  await col.updateOne({ _id: new ObjectId(commentId) }, { $set: { deletedAt: new Date() } });
}

async function toggleReaction(type: "post" | "comment", id: string, userId: string, reaction: "like" | "dislike") {
  const col = type === "post" ? await getPostCollection() : await getCommentCollection();
  const objId = new ObjectId(id);
  const item = await col.findOne({ _id: objId });
  if (!item) throw new Error(`${type} not found`);

  const likes = item.likes || [];
  const dislikes = item.dislikes || [];

  if (reaction === "like") {
    if (!likes.includes(userId)) likes.push(userId);
    const idx = dislikes.indexOf(userId);
    if (idx > -1) dislikes.splice(idx, 1);
  } else {
    if (!dislikes.includes(userId)) dislikes.push(userId);
    const idx = likes.indexOf(userId);
    if (idx > -1) likes.splice(idx, 1);
  }

  await col.updateOne({ _id: objId }, { $set: { likes, dislikes, updatedAt: new Date() } });
  return { likes, dislikes };
}

export async function POST(req: Request) {
  const data = await req.json();

  if (data.postId && data.content && data.createdBy) {
    const commentId = await addComment(data);
    return NextResponse.json({ success: true, commentId });
  }

  const { channelSlug, title, content, createdBy } = data;
  if (!channelSlug || !title || !content || !createdBy?.userId)
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });

  const postId = await createPost(data);
  return NextResponse.json({ success: true, postId });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");
  const channelSlug = url.searchParams.get("channelSlug");

  if (postId) {
    const comments = await getComments(postId);
    return NextResponse.json({ success: true, comments });
  }

  const posts = await getPosts(channelSlug || undefined);
  return NextResponse.json({ success: true, posts });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { type, id, userId, reaction, incrementView } = data;

  if (incrementView && id) {
    const post = await incrementPostView(id);
    return NextResponse.json({ success: true, post });
  }

  if (type && id && userId && reaction) {
    try {
      const result = await toggleReaction(type, id, userId, reaction);
      return NextResponse.json({ success: true, ...result });
    } catch (err: any) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: false, error: "No valid action specified" }, { status: 400 });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  const { postId, commentId } = data;

  if (postId) {
    const col = await getPostCollection();
    await col.updateOne({ _id: new ObjectId(postId) }, { $set: { isRemoved: true, updatedAt: new Date() } });
    return NextResponse.json({ success: true });
  }

  if (commentId) {
    await softDeleteComment(commentId);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "No valid ID provided" }, { status: 400 });
}
