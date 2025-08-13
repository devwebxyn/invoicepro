import React from "react";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Switch = ({ checked, onCheckedChange, className }: SwitchProps) => (
  <label className={"switch " + (className ?? "")}
    style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onCheckedChange(e.target.checked)}
      style={{ display: "none" }}
    />
    <span
      style={{
        width: 36,
        height: 20,
        background: checked ? "#4f46e5" : "#ccc",
        borderRadius: 10,
        position: "relative",
        transition: "background 0.2s"
      }}
    >
      <span
        style={{
          position: "absolute",
          left: checked ? 18 : 2,
          top: 2,
          width: 16,
          height: 16,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          transition: "left 0.2s"
        }}
      />
    </span>
  </label>
);

export default Switch;
