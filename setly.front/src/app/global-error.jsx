"use client";

import { useEffect } from "react";
import TechnicalErrorPage from "./technical-error-page";
import { reportClientError } from "./lib/error-monitor";

export default function GlobalError({ error }) {
  useEffect(() => {
    reportClientError(error, "global-error");
  }, [error]);

  return <TechnicalErrorPage asDocument />;
}
