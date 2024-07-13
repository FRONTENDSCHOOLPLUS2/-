import { useEffect, useState } from "react";
import CommentNew from "@pages/community/CommentNew";
import CommentItem from "./CommentItem";

function CommentList({ postId, onAddCommentCount, onDeleteCommentCount }) {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const postComments = storedComments.filter((comment) => comment.postId === postId);
    setComments(postComments);
  }, [postId]);

  // 댓글 추가 함수
  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
    onAddCommentCount(); // *** 댓글 수 업데이트 함수 호출
  };


  // 댓글 삭제 함수
  const handleDelete = (id) => {
    let storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    storedComments = storedComments.filter((comment) => comment.id !== id);
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(storedComments.filter((comment) => comment.postId === postId));
    onDeleteCommentCount(); // *** 댓글 수 감소 함수 호출
  };

  // 댓글 수정 시작 함수
  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setEditingCommentContent(content);
  };

  // 댓글 수정 저장 함수
  const handleSave = (id) => {
    let storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    storedComments = storedComments.map((comment) =>
      comment.id === id ? { ...comment, content: editingCommentContent } : comment
    );
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(storedComments.filter((comment) => comment.postId === postId));
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {comments.length}개</h4>

      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={handleDelete} //^^ 삭제 함수 전달
          onEdit={handleEdit} //^^ 수정 함수 전달
          onSave={handleSave} //^^ 저장 함수 전달
          isEditing={editingCommentId === comment.id} //^^ 현재 수정 중인 댓글인지 확인
          editingContent={editingCommentContent} //^^ 수정 중인 댓글 내용 전달
          setEditingContent={setEditingCommentContent} //^^ 수정 중인 댓글 내용 설정 함수 전달
        />
      ))}
      {/* ^^ 새로운 댓글 입력 컴포넌트 추가 */}
      <CommentNew postId={postId} onAddComment={handleAddComment} /> 
    </section>
  );
}

export default CommentList;
