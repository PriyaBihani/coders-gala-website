import React from "react";
import { NavLink } from "react-router-dom";
import moment from 'moment'

const Featured = ({ articles }) => {
    return (
        <div>
            {articles &&
                articles.map((article) => {
                    if (article && article.featured === true) {
                        console.log(article)
                        const ArticleId = article && article._id;
                        return (
                            <div className="grid__item-sm" key={article && article.id}>
                                <NavLink to={"/blog/article/" + ArticleId + "/read"}>
                                    <div>
                                        <p className="grid__item__category">
                                            {article && moment(article.createdAt).format("DD MM YYYY")}
                                        </p>
                                        <h4 className="grid__item__title">
                                            {article && article.name}
                                        </h4>
                                        <br />
                                        <br />
                                        <p className="grid__item__author">
                                            By CodersGala
                                        </p>
                                    </div>
                                    <div>
                                        <img
                                            src={article.thumbnailUrl ? article.thumbnailUrl : "https://codersgala.com/static/media/cgTransparent.6a9c3496.PNG"}
                                            className="grid__item__img"
                                            alt=""
                                            className="grid__item__img"
                                        />
                                    </div>
                                </NavLink>
                            </div>
                        );
                    }
                    return null;
                })}
        </div>
    );
};

export default Featured;
