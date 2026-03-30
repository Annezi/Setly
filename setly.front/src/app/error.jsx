"use client";

import { useEffect } from "react";
import TechnicalErrorPage from "./technical-error-page";
import { reportClientError } from "./lib/error-monitor";

export default function Error({ error }) {
  useEffect(() => {
    reportClientError(error, "segment-error");
  }, [error]);

  return <TechnicalErrorPage />;
}
