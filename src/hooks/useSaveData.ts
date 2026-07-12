"use client";

import { useEffect, useState } from "react";

/** The slice of the Network Information API we care about. Not in lib.dom yet. */
interface NetworkInformation extends EventTarget {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}

/**
 * True when the visitor has asked to save data, or is on a 2G-class connection.
 *
 * Chrome and the Android browsers expose this; Safari and Firefox do not, and
 * return false — which is the right default (assume a normal connection, show
 * the full experience).
 */
export function useSaveData() {
  const [frugal, setFrugal] = useState(false);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (!connection) return;

    const update = () =>
      setFrugal(
        Boolean(connection.saveData) ||
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g",
      );

    update();
    connection.addEventListener("change", update);
    return () => connection.removeEventListener("change", update);
  }, []);

  return frugal;
}
