import { ObjectId } from "mongodb";

export interface Channel {
  _id?: ObjectId;
  name: string;
  slug: string;               
  description?: string;
  createdBy: string;          
  members?: string[];         
  moderators?: string[];
  isPrivate?: boolean;
  tags?: string[];
  rules?: { title: string; description?: string }[];
  bannerImage?: string;      
  profileImage?: string;     
  createdAt: Date;
  updatedAt: Date;
}
