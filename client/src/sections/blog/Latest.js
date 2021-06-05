import React from "react";
import moment from 'moment';
import { NavLink } from "react-router-dom";

const Latest = ({ article }) => {
    console.log(article && article.name.replace(/\s/g, "-"))
    return (
        <div className="grid__item-lg">`
            {article && <NavLink to={`/blog/read/${article && article.name.replace(/\s/g, "-")}`}>
                <img alt="" src={article.thumbnailUrl ? article.thumbnailUrl : "https://codersgala.com/static/media/cgTransparent.6a9c3496.PNG"}
                    className="grid__item__img" className="grid__item__img" />
                <p className="grid__item__category"> {article && moment(article.createdAt).format("DD MM YYYY")}</p>
                <h4 className="grid__item__title">{article.name}</h4>
                <p className="grid__item__author">By CodersGala</p>
            </NavLink>}
        </div>
    );
};

export default Latest;
