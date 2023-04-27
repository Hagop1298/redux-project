import React from "react";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from "../store/slices/post/postSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  // const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const postsStatus = useSelector(getPostsStatus);

  // useEffect(() => {
  //   if (postsStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post, ID) => (
      <PostExcerpt key={ID} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  //   const orderedPosts = posts
  //     .slice()
  //     .sort((a, b) => a.date.localeCompare(b.date));
  //   const renderedPosts = orderedPosts.map((post, i) => (
  //     <article key={i}>
  //       <h3>{post.title}</h3>
  //       <p>{post.content}</p>
  //       <p>
  //         <PostAuthor userId={post.userId} />
  //         <TimeAgo timestamp={post.date} />
  //       </p>
  //       ;
  //       <ReactionButtons post={post} />
  //     </article>
  //   ));
  return (
    <section>
      <h2>Posts</h2>
      {content}
      {/* {renderedPosts} */}
      {/* {orderedPosts.map((post, i) => ( */}
      {/* // <article key={i}>
        //   <h3>{post.title}</h3>
        //   <p>{post.content}</p>
        //   <p>
        //     <PostAuthor userId={post.userId} />
        //     <TimeAgo timestamp={post.date} />
        //   </p>
        //   ;
        //   <ReactionButtons post={post} />
        // </article> */}
      {/* //   ))} */}
    </section>
  );
};
export default PostsList;
