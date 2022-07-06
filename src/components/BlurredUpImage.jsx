import React from "react";
import useProgressiveImg from "./useProgressiveImg";
const BlurredUpImage = (props) => {
  const [src, { blur }] = useProgressiveImg(props.small, props.large);
  return (
    <img
      src={src}
      style={{
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.3s ease-out"
      }}
      alt="Duke BotW Bingo Location" 
      className="board-img"
    />
  );
}; export default BlurredUpImage