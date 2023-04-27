import React from "react";
import PostAuthor from "./postAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./reactionButtons";
import { useSelector } from "react-redux";
import { selecetPostById } from "../store/slices/post/postSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useSelector((state) => selecetPostById(state, Number(postId)))
    if(!post){
        return(
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post}/>
    </article>
  )
};

export default SinglePostPage;
