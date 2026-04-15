"use client";

import { Printer } from "lucide-react";

const PrintButton = () => {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn-ghost btn-sm gap-2 text-base-content/65 hover:text-base-content"
      aria-label="Print"
    >
      <Printer size={15} />
      <span className="hidden sm:block text-xs">Print This Report</span>
    </button>
  );
};

export default PrintButton;
