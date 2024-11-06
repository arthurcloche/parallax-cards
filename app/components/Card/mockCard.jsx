import { useContext } from "react";
import CardContext from "../../contexts/CardContext";

function Card({ i }) {
  const context = useContext(CardContext);
  console.log(context);
  return (
    <div className="w-[800px] h-[600px] bg-red-500 flex items-center justify-center">
      I am Card {i} {context.a}
    </div>
  );
}

export default Card;
