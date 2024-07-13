import Button from "@components/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentList from './CommentList'; // 댓글 리스트 컴포넌트 임포트

function Detail() {
  const navigate = useNavigate();
  const { type, _id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((p) => p.id === Number(_id));
    setPost(post);
  }, [_id]);

  const handleDelete = () => {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter((p) => p.id !== Number(_id));

    // 글 번호 재조정
    posts = posts.map((p, index) => ({ ...p, id: index + 1 }));
    localStorage.setItem("posts", JSON.stringify(posts));

    navigate(`/${type}`);
  };

  // // 댓글 수 재조정 (댓글 추가 시 댓글 수 업데이트하는 함수)
  // const handleAddCommentCount = () => { 
  //   const posts = JSON.parse(localStorage.getItem("posts")) || [];
  //   const updatedPosts = posts.map(p =>
  //     p.id === post.id ? { ...p, comments: p.comments + 1 } : p
  //   );
  //   localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //   setPost({ ...post, comments: post.comments + 1 });
  // };

  // // 댓글 수 재조정 (댓글 삭제 시 댓글 수 업데이트하는 함수)
  // const handleDeleteCommentCount = () => { 
  //   const posts = JSON.parse(localStorage.getItem("posts")) || [];
  //   const updatedPosts = posts.map(p =>
  //     p.id === post.id ? { ...p, comments: p.comments - 1 } : p
  //   );
  //   localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //   setPost({ ...post, comments: post.comments - 1 });
  // };
  // 위의 두개의 코드를 하나로 통합
  // 댓글 수 재조정 (댓글 수 업데이트 함수)
  const updateCommentCount = (increment) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map(p => 
      p.id === post.id ? {...p, comments: p.comments + increment } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost({ ...post, comments: post.comments + increment });
  };



  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {post.title}</div>
        <div className="text-right text-gray-400">작성자 : {post.author}</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{post.content}</pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(`/${type}`)}>목록</Button> {/* ^^ 목록 버튼 수정 */}
          <Button bgColor="gray" onClick={() => navigate(`/${type}/${_id}/edit`)}>수정</Button>
          <Button bgColor="red" onClick={handleDelete}>삭제</Button>
        </div>
      </section>
      {/* 댓글수와 조회수 카운팅 */}
      <CommentList 
        postId={post.id} 
        onAddCommentCount={() => updateCommentCount(1)} // 댓글 수 증가 함수 전달
        onDeleteCommentCount={() => updateCommentCount(-1)} // 댓글 수 감소 함수 전달
      />
    </main>
  );
}

export default Detail;
