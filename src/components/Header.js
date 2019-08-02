import React from "react"
import styles from "./styles/Header.module.scss"

export default function Header () {
    return (
        <header className={styles.header} >
            <h1>Battleship</h1>
        </header>
    )
}