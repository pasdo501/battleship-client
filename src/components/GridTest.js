import React from "react";

import InfoColumn from "./InfoColumn";

import { FREE_CELL, CELL_HIT } from "../util/variables";

import styles from "./styles/GridTest.module.scss";

export default function GridTest() {

  const shoot = null;
  const interactive = false;

  const testBoard = `[[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Destroyer","type":5,"size":2,"quantity":1,"color":"khaki"},"hover":false,"color":"white","head":[6,4],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Destroyer","type":5,"size":2,"quantity":1,"color":"khaki"},"hover":false,"color":"white","head":[6,4],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}]]`;
  const board = JSON.parse(testBoard);

  return (
    <div className={styles.board}>
      <div className={styles.grid}>
        <InfoColumn />
        {board.map((row, index) => (
          <React.Fragment key={`row-${index}`}>
            {row.map((column, cIndex) => {
              let targeted = false;
              let hit = false;

              if (!interactive) {
                targeted = column.targeted !== undefined;
                // If column type is unset, there is not ship on this square
                hit = targeted && column.type;
              } else {
                targeted = column !== FREE_CELL;
                hit = targeted && column === CELL_HIT;
              }

              return (
                <React.Fragment key={`cell-${index}-${cIndex}`}>
                  {cIndex === 0 ? (
                    <div className={styles.cell}><span>{index + 1}</span></div>
                  ) : null}
                  <div 
                    className={interactive ? styles.interactiveCell : styles.cell}
                    style={{ backgroundColor: column.type ? column.type.color : column.color }} 
                    onClick={ interactive && !targeted && shoot ? () => shoot(index, cIndex) : null}
                >
                      {targeted && (<span className={hit ? styles.hit : styles.miss}>{hit ? "X" : "O"}</span>)}
                    </div>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}