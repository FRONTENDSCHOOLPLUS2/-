import React from 'react';
import Button from './../../components/Button';

function CommentItem({ comment, onDelete, onEdit, onSave, isEditing, editingContent, setEditingContent }) {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img className="w-8 mr-2 rounded-full" src="http://api.fesp.shop/files/00-sample/user-muzi.webp" alt="프로필 이미지" />
        <span className="text-orange-400">{comment.author}</span>
        <time className="ml-auto text-gray-500" dateTime={comment.createdAt}>{comment.createdAt}</time>
      </div>
      {isEditing ? (
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          ></textarea>
          <Button size="sm" onClick={() => onSave(comment.id)}>저장</Button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-2">
          <pre className="whitespace-pre-wrap text-sm">{comment.content}</pre>
          <div>
            <Button size="sm" onClick={() => onEdit(comment.id, comment.content)}>수정</Button>
            <Button bgColor="red" size="sm" onClick={() => onDelete(comment.id)}>삭제</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentItem;
