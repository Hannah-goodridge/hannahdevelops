'use client';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, runTransaction, DataSnapshot, Database } from 'firebase/database';
import { FirebaseApp } from 'firebase/app';
import loadFirebase from '../../db/firebase';

interface BlogLikeCounterProps {
  postId: string;
}

const BlogLikeCounter: React.FC<BlogLikeCounterProps> = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [firebase, setFirebase] = useState<{ app: FirebaseApp; database: Database } | null>(null);
  const [showCounter, setShowCounter] = useState(true);

  useEffect(() => {
    loadFirebase().then(setFirebase);
  }, []);

  useEffect(() => {
    if (!firebase) {
      return;
    }

    const db = getDatabase();
    const likesRef = ref(db, `pages/${postId}/likes`);
    const dislikesRef = ref(db, `pages/${postId}/dislikes`);

    onValue(likesRef, (snapshot: DataSnapshot) => {
      setLikes(snapshot.val() || 0);
    });

    onValue(dislikesRef, (snapshot: DataSnapshot) => {
      setDislikes(snapshot.val() || 0);
    });

    // Cleanup function
    return () => {
      off(likesRef);
      off(dislikesRef);
    };
  }, [postId, firebase]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;

      if (documentHeight - scrollPosition <= windowHeight * 1.2) {
        setShowCounter(false);
      } else {
        setShowCounter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLike = () => {
    if (!firebase) {
      return;
    }

    const db = getDatabase();
    const likesRef = ref(db, `pages/${postId}/likes`);

    runTransaction(likesRef, (currentLikes: number) => {
      return (currentLikes || 0) + 1;
    });
    setIsLiked(true);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    if (!firebase) {
      return;
    }

    const db = getDatabase();
    const dislikesRef = ref(db, `pages/${postId}/dislikes`);

    runTransaction(dislikesRef, (currentDislikes: number) => {
      return (currentDislikes || 0) + 1;
    });
    setIsLiked(false);
    setIsDisliked(true);
  };

  return (
    <div
      className={`anim-slide-in-bottom xl:px-0 xs:px-4 md:px-0 pb-8 lg:fixed lg:right-20 flex flex-row lg:flex-col items-center lg:justify-center ${
        showCounter ? 'visible' : 'hidden'
      }   md:visible`}
    >
      <p className="visible lg:hidden">Like this post?</p>
      <button
        type="button"
        className={`p-2 transition ease-in-out rounded-full text-white hover:cursor-pointer ${isLiked ? 'scale-150' : ''}`}
        onClick={handleLike}
        onMouseEnter={() => setIsLiked(true)}
        onMouseLeave={() => setIsLiked(false)}
        aria-label="Like"
      >
        👍
      </button>
      <span role="status" aria-live="polite">
        {likes}
      </span>
      <button
        type="button"
        className={`p-2 transition-all rounded-full text-white hover:cursor-pointer ${isDisliked ? 'scale-150' : ''}`}
        onClick={handleDislike}
        onMouseEnter={() => setIsDisliked(true)}
        onMouseLeave={() => setIsDisliked(false)}
        aria-label="Dislike"
      >
        👎
      </button>
      <span role="status" aria-live="polite">
        {dislikes}
      </span>
    </div>
  );
};

export default BlogLikeCounter;
