import { type TabsProps } from "../types/course";
import TabButton from "./TabButton";
export function TabsButtons({ tabs, setTabs }: TabsProps) {
  const coursStatus = ["All", "Active", "Completed"];
  return (
    <div
      className="m-8 text-sm font-medium text-center text-body border-b border-default"
      role="tablist"
      aria-label="Course status tabs"
    >
      <ul
        className="flex flex-wrap -mb-px"
        role="presentation"
        aria-orientation="horizontal"
      >
        {coursStatus.map((course) => (
          <li className="me-2" key={course}>
            <TabButton setTabs={setTabs} tabs={tabs} label={course} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabsButtons;
