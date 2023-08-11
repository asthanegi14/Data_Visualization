import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
      "end_year": {
        "type": "String"
      },
      "intensity": {
        "type": "Number"
      },
      "sector": {
        "type": "String"
      },
      "topic": {
        "type": "String"
      },
      "insight": {
        "type": "String"
      },
      "url": {
        "type": "String"
      },
      "region": {
        "type": "String"
      },
      "start_year": {
        "type": "String"
      },
      "impact": {
        "type": "String"
      },
      "added": {
        "type": "Date"
      },
      "published": {
        "type": "Date"
      },
      "country": {
        "type": "String"
      },
      "relevance": {
        "type": "Number"
      },
      "pestle": {
        "type": "String"
      },
      "source": {
        "type": "String"
      },
      "title": {
        "type": "String"
      },
      "likelihood": {
        "type": "Number"
      }
    },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
