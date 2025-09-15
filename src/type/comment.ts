import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;          
  postId: ObjectId;        
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  likes: string[];         
  dislikes: string[];      
  parentId?: ObjectId;    
  createdAt?: Date;        
  updatedAt?: Date;        
  deletedAt?: Date;       
}
