import * as React from "react";

const TabsContext = React.createContext<{ value: string; setValue: (v: string) => void } | undefined>(undefined);

export function Tabs({ children, defaultValue, className }: { children: React.ReactNode; defaultValue?: string; className?: string }) {
  const [value, setValue] = React.useState(defaultValue ?? "");
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className ?? ""}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className ?? ""}>{children}</div>;
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  return (
    <button type="button" className={className ?? ""} onClick={() => ctx?.setValue(value)}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  return ctx.value === value ? <div className={className ?? ""}>{children}</div> : null;
}
