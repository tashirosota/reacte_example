import React, { memo } from "react";

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// Board（盤面） コンポーネントから { onClick, value } = props を受け取っている
const Square = memo(({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
});

export default Square;