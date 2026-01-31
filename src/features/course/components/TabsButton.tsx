import { type SetStateAction } from "react";

interface TabsProps {
  tabs: string;
  setTabs: (val: string) => void;
}
export function TabsButton({ tabs, setTabs }: TabsProps) {
  return (
    <div className="m-8 text-sm font-medium text-center text-body border-b border-default">
      <ul className="flex flex-wrap -mb-px" role="tablist">
        <li className="me-2">
          <button
            role="tab"
            onClick={(e) => {
              setTabs(e.currentTarget.id as "All" | "Active" | "Completed");
            }}
            id="All"
            className={
              tabs === "All"
                ? "inline-block p-4 text-fg-brand border-b border-brand rounded-t-base active bg-blue-300"
                : "inline-block p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand"
            }
          >
            All
          </button>
        </li>
        <li className="me-2">
          <button
            className={
              tabs === "Active"
                ? "inline-block p-4 text-fg-brand border-b border-brand rounded-t-base active bg-blue-300"
                : "inline-block p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand"
            }
            onClick={(e) => {
              setTabs(e.currentTarget.id);
            }}
            aria-current="page"
            id="Active"
            role="tab"
          >
            Active
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={(e) => {
              setTabs(e.currentTarget.id);
            }}
            role="tab"
            id="Completed"
            className={
              tabs === "Completed"
                ? "inline-block p-4 text-fg-brand border-b border-brand rounded-t-base active bg-blue-300"
                : "inline-block p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand"
            }
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TabsButton;
