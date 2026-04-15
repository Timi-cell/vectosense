import {
  NormalisedResistanceLevel,
  getResistanceBadgeClass,
  getResistanceLevelLabel,
} from "@/data/data";

interface Props {
  level: NormalisedResistanceLevel;
  size?: "xs" | "sm" | "md" | "lg";
  showIcon?: boolean;
}

export default function ResistanceLevelBadge({
  level,
  size = "md",
  showIcon = false,
}: Props) {
  const sizeClass = {
    xs: "badge-xs text-[10px]",
    sm: "badge-sm text-xs",
    md: "text-sm",
    lg: "badge-lg text-base px-4 py-3",
  }[size];

  return (
    <span
      className={[
        "badge font-heading font-semibold gap-1",
        getResistanceBadgeClass(level),
        sizeClass,
      ].join(" ")}
    >
      {showIcon && level === "very-high" && "⚠ "}
      {getResistanceLevelLabel(level)} Resistance
    </span>
  );
}
