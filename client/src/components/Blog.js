import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllArticles } from "../actions/article";
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Featured from '../sections/blog/Featured'
import Latest from '../sections/blog/Latest'
import All from '../sections/blog/All'
import Sidebar from '../sections/blog/Sidebar';



const Blog = ({ getAllArticles, articles, isAdmin, history }) => {
    useEffect(() => {
        if (articles.length === 0) {
            getAllArticles()
        }
        console.log(history)
    }, [articles, getAllArticles])

    return (
        <div id="main-content" class="blog-page">
            <div className="blog-header">
                <h1 class="heading">CodersGala <span class="underline--magical">Blog</span> </h1>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    articles: state.article.articles,
    isAdmin: state.auth.isAdmin,

});

export default connect(mapStateToProps, { getAllArticles })(Blog);



// const Blog = ({ getAllArticles, articles, isAdmin }) => {
//     useEffect(() => {
//         if (articles.length === 0) {
//             getAllArticles()
//         }
//     }, [articles, getAllArticles])

//     console.log(articles)
//     return (
//         <div className="blog-container">

//             <nav className="nav__top">
//                 <a rel="nofollow" href="#" className="nav__top__link"></a>
//             </nav>
//             {isAdmin && <NavLink to="/article/add" rel="nofollow">
//                 <Button variant="primary" size="lg" block>
//                     Add Article
//                 </Button>
//             </NavLink>}
//             <div className="title">
//                 <h1 style={{ fontFamily: "Dosis" }} className="title__h1">
//                     {" "}
//                     CodersGala <span>Blog</span>
//                 </h1>
//                 <p className="title__sub">Sorry :(</p>
//             </div>
//             <article className="grid">
//                 <section className="grid__col-2">
//                     <Latest article={articles && articles[0]} />
//                     <div>
//                         <h3 className="grid__col__title">Featured Articles</h3>
//                         <Featured articles={articles} />
//                         {/* <NewsletterForm /> */}
//                     </div>
//                 </section>
//                 <h3 className="grid__col__title">Also Read...</h3>
//                 <All articles={articles} />
//             </article>
//         </div>
//     );
// }
