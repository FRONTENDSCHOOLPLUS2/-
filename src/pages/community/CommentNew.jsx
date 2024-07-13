import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../api/atoms/authAtom';
import Submit from "@components/Submit";

function CommentNew({ postId, onAddComment }) {
  const [comment, setComment] = useState("");
  const auth = useRecoilValue(authState);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      id: Date.now(),
      postId,
      content: comment,
      author: auth.isAuthenticated ? auth.username : '게스트',
      createdAt: new Date().toLocaleString(),
    };

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));

    setComment("");
    onAddComment(newComment);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}

export default CommentNew;
