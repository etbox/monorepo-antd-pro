import React from "react";

const AnotherButton = props => (
    <button {...props}>
        {props.children}
    </button>
);

export default AnotherButton