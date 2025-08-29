import { getDB } from "../db";
import { Channel } from "../../type/channel";

export async function getChannelCollection() {
  const db = await getDB(); 
  return db.collection<Channel>("channels");
}
