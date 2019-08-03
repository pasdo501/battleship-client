import React from "react";

import {
  CARRIER,
  BATTLESHIP,
  CRUISER,
  SUBMARINE,
  DESTROYER,
} from "../util/variables";

const initialPlacementObjects = [
  CARRIER,
  BATTLESHIP,
  CRUISER,
  SUBMARINE,
  DESTROYER,
];

const initialTotal = initialPlacementObjects.reduce((total, ship) => {
  return total + ship.quantity;
}, 0)

export default function usePlacement() {
  const [placementObjects, setPlacementObjects] = React.useState(
    initialPlacementObjects
  );
  const [totalLeft, setTotalLeft] = React.useState(initialTotal)

  const decrementType = (type) => {
    setPlacementObjects((objects) =>
      objects.map((o) => {
        if (o.type === type) {
          return {
            ...o,
            quantity: o.quantity - 1,
          };
        }
        return o;
      })
    );
    setTotalLeft(total => total - 1)
  };

  const incrementType = (type) => {
    setPlacementObjects((objects) =>
      objects.map((o) => {
        if (o.type === type) {
          return {
            ...o,
            quantity: o.quantity + 1,
          };
        }
        return o;
      })
    );
    setTotalLeft(total => total + 1)
  };

  return [placementObjects, decrementType, incrementType, totalLeft];
}
