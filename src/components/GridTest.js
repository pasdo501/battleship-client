import React from "react";

import Board from "./Board";
import ChatBox from "./ChatBox"

import styles from "./styles/shared.module.scss"

export default function GridTest() {
  const testBoard = `[[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Carrier","type":1,"size":5,"quantity":1,"color":"silver"},"hover":false,"color":"white","head":[0,5],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":{"name":"Cruiser","type":3,"size":3,"quantity":1,"color":"aquamarine"},"hover":false,"color":"white","head":[2,8],"orientation":"v"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Submarine","type":4,"size":3,"quantity":1,"color":"skyblue"},"hover":false,"color":"white","head":[3,7],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":{"name":"Battleship","type":2,"size":4,"quantity":1,"color":"slategrey"},"hover":false,"color":"white","head":[3,1],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Destroyer","type":5,"size":2,"quantity":1,"color":"khaki"},"hover":false,"color":"white","head":[6,4],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":{"name":"Destroyer","type":5,"size":2,"quantity":1,"color":"khaki"},"hover":false,"color":"white","head":[6,4],"orientation":"v"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}],[{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"},{"type":0,"hover":false,"color":"white"}]]`;
  const board = JSON.parse(testBoard);

  return (
    <div className={styles.board}>
      <Board board={board} interactive={false} shoot={null} />
      <Board board={board} interactive={true} shoot={null} />
      <ChatBox />
    </div>
  );
}
