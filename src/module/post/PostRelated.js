import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "" }) => {
  const [categoryPost, setCategoryPost] = useState();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("category.id", "==", categoryId));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      setCategoryPost(result);
    }
    fetchData();
  }, [categoryId]);
  if (!categoryId) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {categoryPost?.length > 0 &&
          categoryPost.map((post) => (
            <PostItem post={post} key={post.title}></PostItem>
          ))}
      </div>
    </div>
  );
};

export default PostRelated;
