import React from 'react';

const Helmet = (props) => {
    document.title = "MULTI-MART " + props.title;
    return <div>{props.children}</div>
};

export default Helmet;