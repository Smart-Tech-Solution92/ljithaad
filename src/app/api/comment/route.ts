import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { addComment, getCommentsByPost, softDeleteComment, toggleReaction } from "@/lib/model/comment";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    if (!postId) return NextResponse.json({ success: false, message: "postId is required" }, { status: 400 });

    const comments = await getCommentsByPost(postId);
    return NextResponse.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, userId, username, avatar, content, parentId } = body;

    if (!postId || !userId || !username || !content) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newCommentId = await addComment({
      postId: new ObjectId(postId),
      userId,
      username,
      avatar,
      content,
      parentId: parentId ? new ObjectId(parentId) : undefined,
    });

    return NextResponse.json({ success: true, commentId: newCommentId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to add comment" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { commentId, userId, reaction } = body;

    if (!commentId || !userId || !reaction || !["like", "dislike"].includes(reaction)) {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    const updated = await toggleReaction(commentId, userId, reaction as "like" | "dislike");

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to update reaction" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    if (!commentId) return NextResponse.json({ success: false, message: "commentId is required" }, { status: 400 });

    await softDeleteComment(commentId);
    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to delete comment" }, { status: 500 });
  }
}
