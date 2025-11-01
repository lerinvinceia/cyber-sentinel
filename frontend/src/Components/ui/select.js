import React from "react";

export const Select = ({ children, onValueChange, defaultValue }) => (
  <select
    className="border rounded p-2"
    defaultValue={defaultValue}
    onChange={(e) => onValueChange(e.target.value)}
  >
    {children}
  </select>
);

export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <>{placeholder}</>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
