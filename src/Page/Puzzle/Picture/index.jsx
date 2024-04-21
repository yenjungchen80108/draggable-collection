import React from "react";
import { useDrag } from "react-dnd";

const Picture = ({ id, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={url}
      style={{ border: isDragging ? "2px solid #8DECB4" : "0px" }}
      alt=""
    />
  );
};

export default Picture;
