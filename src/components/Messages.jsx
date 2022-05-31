import React from "react";

const Messages = ({ msg, bgcolor }) => {
  return (
    <div className="container mt-5 ">
      <h2 className={`rounded p-3 text-light text-center bg-${bgcolor}`}>{msg}</h2>
    </div>
  );
};

export default Messages;
