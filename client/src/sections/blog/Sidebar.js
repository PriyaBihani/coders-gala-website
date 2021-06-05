import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Sidebar = ({ history, articles }) => {
    // var items = []

    const items = articles
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if (results.length > 0) {
            console.log(`Found ${results.length} results for ${string}`)
        } else {
            if (results.length > 0) {
                console.log('No results')
            }
        }
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log('hovered')
    }

    const handleOnSelect = (item) => {
        // the item selected
        // console.log(props)
        history.push(`/blog/read/${item.name.replace(
            /\s/g,
            "-"
        )}`)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    return (
        <div className="col-lg-4 col-md-12 right-box">
            <div className="card">
                <div className="body search">
                    <div className="input-group m-b-0">

                        <ReactSearchAutocomplete
                            items={items}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            styling={{ zIndex: 2, width: "100%" }}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="header">
                    <h2>Categories</h2>
                </div>
                <div className="body widget">
                    <ul className="list-unstyled categories-clouds m-b-0">
                        <li><a href="javascript:void(0);">eCommerce</a></li>
                        <li>
                            <a href="javascript:void(0);">Microsoft Technologies</a>
                        </li>
                        <li><a href="javascript:void(0);">Creative UX</a></li>
                        <li><a href="javascript:void(0);">Wordpress</a></li>
                        <li><a href="javascript:void(0);">Angular JS</a></li>
                        <li><a href="javascript:void(0);">Enterprise Mobility</a></li>
                        <li><a href="javascript:void(0);">Website Design</a></li>
                        <li><a href="javascript:void(0);">HTML5</a></li>
                        <li><a href="javascript:void(0);">Infographics</a></li>
                        <li>
                            <a href="javascript:void(0);">Wordpress Development</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="header">
                    <h2>
                        Email Newsletter
                    </h2>
                    <div>
                        Sign up for our newsletter and we'll update you whenever new content is uploaded
                    </div>
                    <img style={{ width: "100%" }} src="https://mailrelay.com/wp-content/uploads/2016/12/newsletter.jpg" alt="" />
                </div>
                <div className="body widget newsletter">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text"
                            ><i className="icon-paper-plane"></i
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;