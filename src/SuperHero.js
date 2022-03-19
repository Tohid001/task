import React from "react";

function SuperHero({ superHero, onDelete }) {
  console.log(`${superHero.name} rendered`);
  return (
    <div
      style={{
        border: "2px solid red",
        display: "flex",
        flexDirection: "column",
        flexBasis: "20%",
        alignItems: "center",
      }}
    >
      <h4>{superHero.name}</h4>
      <h6>{superHero.alterEgo}</h6>
      {/* {console.log("checking")} */}
      <div>
        <button
          onClick={() => {
            // console.log("delete clicked");
            onDelete(superHero.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SuperHero);
// export default SuperHero;
