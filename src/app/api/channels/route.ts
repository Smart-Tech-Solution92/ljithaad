import { NextResponse } from "next/server";
import { getChannelCollection } from "../../../lib/model/channel";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const tag = url.searchParams.get("tag");
    const isPrivate = url.searchParams.get("private");

    const collection = await getChannelCollection();

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search by name
    }

    if (tag) {
      query.tags = tag;
    }

    if (isPrivate !== null) {
      query.isPrivate = isPrivate === "true";
    }

    const channels = await collection.find(query).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, channels });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch channels" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, createdBy, tags, isPrivate } = await req.json();

    if (!name || name.length < 3) {
      return NextResponse.json({ success: false, error: "Channel name must be at least 3 characters" }, { status: 400 });
    }

    const collection = await getChannelCollection();
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await collection.findOne({ slug });
    if (existing) return NextResponse.json({ success: false, error: "Channel already exists" }, { status: 400 });

    const now = new Date();
    const result = await collection.insertOne({
      name,
      slug,
      description: description || "",
      createdBy,
      members: [createdBy],
      moderators: [createdBy],
      isPrivate: isPrivate || false,
      tags: tags || [],
      rules: [],
      bannerImage: "",
      profileImage: "",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to create channel" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { slug, name, description, tags, isPrivate } = await req.json();
    if (!slug) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });

    const collection = await getChannelCollection();
    const updateData: any = { updatedAt: new Date() };

    if (name) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, "-");
    }
    if (description !== undefined) updateData.description = description;
    if (tags) updateData.tags = tags;
    if (isPrivate !== undefined) updateData.isPrivate = isPrivate;

    const result = await collection.updateOne({ slug }, { $set: updateData });
    if (result.matchedCount === 0) return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to update channel" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });

    const collection = await getChannelCollection();
    const result = await collection.deleteOne({ slug });

    if (result.deletedCount === 0) return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to delete channel" }, { status: 500 });
  }
}
