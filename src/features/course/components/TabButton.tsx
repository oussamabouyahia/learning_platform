import { type TabsProps } from "../types/course";
const TabButton = ({ setTabs, tabs, label }: TabsProps) => {
  return (
    <button
      role="tab"
      aria-selected={tabs === label}
      onClick={() => {
        if (label) {
          setTabs(label);
        }
      }}
      id={label}
      className={
        tabs === label
          ? "inline-block p-4 text-fg-brand border-b border-brand rounded-t-base active bg-blue-300"
          : "inline-block p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand"
      }
    >
      {label}
    </button>
  );
};

export default TabButton;
