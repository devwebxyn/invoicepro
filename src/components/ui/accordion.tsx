import React, { useState } from "react";

export interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const AccordionItem = ({ value, trigger, children }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen((o) => !o)}>{trigger}</button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion = ({ children, className }: AccordionProps) => (
  <div className={"accordion " + (className ?? "")}>{children}</div>
);

export const AccordionTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const AccordionContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default Accordion;
