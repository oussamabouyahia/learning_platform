import { TabsButtons } from "./TabsButtons";
import type { SearchProps } from "../types/course";

const Search = ({ searchTerm, setSearchTerm, tabs, setTabs }: SearchProps) => {
  return (
    <div>
      <div className="mb-8 relative w-600">
        <input
          type="search"
          aria-label="Search courses"
          id="default-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search a course"
          className="block  p-4 ps-10 text-sm text-gray-900 border border-gray-300
            rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
      <TabsButtons tabs={tabs} setTabs={setTabs} />
    </div>
  );
};
export default Search;
