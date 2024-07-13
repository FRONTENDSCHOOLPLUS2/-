import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil'; // Recoil 상태 불러오기
import { authState } from '../../api/atoms/authAtom'; // Recoil 상태 불러오기
import Button from "@components/Button";
import Submit from "@components/Submit";

function New() {
  const navigate = useNavigate();
  const { type, _id } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const auth = useRecoilValue(authState); // Recoil 상태 값 가져오기

  useEffect(() => {
    if (_id) {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      const post = posts.find((p) => p.id === Number(_id));
      setPost(post);
    }
  }, [_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (_id) {
      const updatedPosts = posts.map((p) =>
        p.id === Number(_id) ? { ...p, title, content } : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      const newPost = {
        id: posts.length + 1,
        title,
        content,
        // author: "용쌤", // 필요에 따라 동적 데이터로 변경 가능
        author: auth.isAuthenticated ? auth.username : '게스트', // 로그인된 사용자 이름 사용 or 게스트
        views: 0,
        comments: 0,
        createdAt: new Date().toLocaleString(),
      };
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));  // 업데이트된 배열을 로컬 스토리지에 저장
    }

    navigate(`/${type}`);
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{_id ? "게시글 수정" : "게시글 등록"}</h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              defaultValue={post?.title}
            />
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              defaultValue={post?.content}
            ></textarea>
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>{_id ? "수정" : "등록"}</Submit>
            <Button type="reset" bgColor="gray" onClick={() => navigate(-1)}>취소</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;
