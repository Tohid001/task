import React from "react";

import { Link } from "react-router-dom";

export default function NavLink() {
  return (
    <>
      {" "}
      <Link to="/home">Home</Link>
      <br />
      <Link to="/counter">Counter</Link>
    </>
  );
}
