import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { VerificationStatus } from "@/types";

interface SourceBadgeProps {
  status: VerificationStatus;
  verifiedAt?: string;
  sourceUrl?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ status, verifiedAt, sourceUrl }) => {
  if (status === "verified") {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs">
        <Badge variant="verified" className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Official Source Verified</span>
        </Badge>
        {verifiedAt && (
          <span className="text-slate-500 font-mono text-[11px]">
            ({verifiedAt})
          </span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-900 hover:text-blue-700 inline-flex items-center ml-1 p-0.5"
            title="View Official Portal Source"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs">
      <Badge variant="unverified" className="flex items-center gap-1">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
        <span>Pending Verification</span>
      </Badge>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-900 inline-flex items-center ml-1"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};
