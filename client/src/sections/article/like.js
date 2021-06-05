import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeArticle } from '../../actions/article'

const Like = ({ articleId, user, likeArticle }) => {
    var liked = user && user.likedArticles.includes(articleId)
    const [animating, setAnimating] = useState(liked)

    const handleLike = () => {
        var action = animating ? "unlike" : "like"
        likeArticle({ action, articleId, userId: user?.userId })
        setAnimating(!animating)
    }

    return (
        <div onClick={() => { handleLike() }} class={`heart ${animating ? 'is_animating_forward' : ""}`}></div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { likeArticle })(Like);