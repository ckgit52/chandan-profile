"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { toast } from "sonner";

export const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please copy it manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="grid size-8 place-items-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    >
      {copied ? (
        <FaCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <FaCopy className="size-3.5" />
      )}
    </button>
  );
};
