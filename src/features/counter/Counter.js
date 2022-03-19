import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trialThunk, selectors, deleteThunk } from "./counterSlice";
import styles from "./Counter.module.css";
import SuperHero from "../../SuperHero.js";

export function Counter() {
  const [s, ss] = useState(true);
  const dispatch = useDispatch();
  const allSuperHeroes = useSelector(selectors.selectAll);
  // const [abortPromise, setAbort] = useState(null);
  console.log("parent rendered");

  useEffect(() => {
    console.log("useef");
    dispatch(trialThunk())
      .unwrap()
      .then((originalPromiseResult) => {
        // console.log("ParentSuccess", originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        // console.log("finalError", rejectedValueOrSerializedError);
      });
    // return () => {
    //   abortPromise && abortPromise.abort();
    // };
  }, []);

  const deleteHandler = useCallback((i) => {
    dispatch(deleteThunk(i))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("finalSuccess", originalPromiseResult);
        // alert("wait....");
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log("finalError", rejectedValueOrSerializedError);
      });
  }, []);

  return (
    // <button
    //   className={styles.button}
    //   onClick={() => {
    //     // const abort = dispatch(trialThunk())
    //     //   .unwrap()
    //     //   .then((originalPromiseResult) => {})
    //     //   .catch((rejectedValueOrSerializedError) => {
    //     //     console.log("unwrap", rejectedValueOrSerializedError);
    //     //   });
    //     // setAbort(abort);
    //     // dispatch(trialThunk())
    //     //   .unwrap()
    //     //   .then((originalPromiseResult) => {
    //     //     console.log("finalSuccess", originalPromiseResult);
    //     //   })
    //     //   .catch((rejectedValueOrSerializedError) => {
    //     //     console.log("finalError", rejectedValueOrSerializedError);
    //     //   });
    //     // setAbort(abort);
    //   }}
    // >
    //   Add Amount
    // </button>

    <>
      <button
        onClick={() => {
          ss(!s);
        }}
      >
        Click
      </button>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {allSuperHeroes.map((superhero, index) => (
          <SuperHero
            key={index}
            superHero={superhero}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </>
  );
}
