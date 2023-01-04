import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";

const Author = ({ userId = "" }) => {
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    async function fetchDataUser() {
      const docRef = doc(db, "users", userId);
      const docData = await getDoc(docRef);
      if (docData.data()) {
        setInfoUser(docData.data());
      }
    }
    fetchDataUser();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={infoUser?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{infoUser?.username}</h3>
        <p className="author-desc">{infoUser?.description}</p>
      </div>
    </div>
  );
};

export default Author;
