import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),

];

export const users = [
  {
    _id: userIds[0],
    email: "admin",
    password: "admin",
  },
];