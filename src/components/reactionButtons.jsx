import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from '../store/slices/post/postSlice'



const reactionEmoji = {
    thumbsUp: 'good',
    wow: "wooww",
    heart: "love",
    rocket: "huuuu",
    eyes: "ummm"
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
            >
                {emoji}{post.reactions[name]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}

export default ReactionButtons