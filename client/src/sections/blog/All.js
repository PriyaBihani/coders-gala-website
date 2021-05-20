import React from "react";
import moment from 'moment'
import { NavLink } from "react-router-dom";

const All = ({ articles }) => {

    return (
        <section className="grid__col-3">
            {articles &&
                articles.map((article) => {
                    const ArticleId = article && article._id;
                    return (
                        <div className="grid__item-md" key={ArticleId}>
                            <NavLink to={"/blog/article/" + ArticleId + "/read"}>
                                <img
                                    alt=""
                                    src={article.thumbnailUrl ? article.thumbnailUrl : "https://codersgala.com/static/media/cgTransparent.6a9c3496.PNG"}
                                    className="grid__item__img"
                                />
                                <p className="grid__item__category">
                                    {" "}
                                    {article && moment(article.createdAt).format("DD MM YYYY")}
                                </p>
                                <h4 className="grid__item__title">{article && article.name}</h4>
                                <p className="grid__item__author">
                                    {" "}
                                    By CodersGala
                                </p>
                            </NavLink>
                        </div>
                    );
                })}
        </section>
    );
};

export default All;
