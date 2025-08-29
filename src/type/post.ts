import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId;
  channelSlug: string;
  title: string;
  content: string;
  createdBy: {
    userId: string;
    username: string;
    avatar?: string;
  };
  images?: string[];    
  likes: string[];
  dislikes: string[];
  tags?: string[];
  viewCount: number;
  flair?: string;
  reports?: { userId: string; reason: string; createdAt: Date }[];
  isRemoved?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;            
  parentId?: ObjectId;         
  content: string;        
  createdBy: {
    userId: string;          
    username: string;         
    avatar?: string;         
  };
  likes: string[];            
  dislikes: string[];          
  reports?: {                 
    userId: string;
    reason: string;
    createdAt: Date;
  }[];
  deletedAt?: Date;            
  createdAt: Date;
  updatedAt: Date;
}

