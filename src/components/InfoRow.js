import React from "react";
import PropTypes from "prop-types";

import { row, cell } from "./styles/InfoRow.module.scss"

export default function InfoRow ({ length = 10}) {
    const cells = [10];
    for (let i = 1; i <= length; i++) {
        cells[i] = String.fromCharCode(64 + i)
    }

    return (
        <div className={row}>
            {cells.map(c => (
                <div key={c} className={cell}>{c}</div>
            ))}
        </div>
    )
}

InfoRow.propTypes = {
    length: PropTypes.number
}