import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selecetPostById,
  updatePost,
  deletePost,
} from "../store/slices/post/postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../store/slices/users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selecetPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content.userId].every(Boolean) && requestStatus === "idle";
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(
        deletePost({
          id: post.id
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate('/');
    } catch (err) {
      console.error("failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
          cols="30"
          rows="10"
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePostClicked} >
          Delete Post
        </button>
      </form>
    </section>
  );
};
export default EditPostForm;
