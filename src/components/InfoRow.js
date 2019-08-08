import React from "react";
import PropTypes from "prop-types";

export default function InfoRow ({ length = 10}) {
    const cells = [10];
    for (let i = 1; i <= length; i++) {
        cells[i] = String.fromCharCode(64 + i)
    }

    return (
        <div>
            {cells.map(cell => (
                <div key={cell}>{cell}</div>
            ))}
        </div>
    )
}

InfoRow.propTypes = {
    length: PropTypes.number
}