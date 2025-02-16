import { SearchCheckIcon } from "lucide-react";

const Searchbar = () => {
  return (
    
    <div className="hidden sm:flex md:hidden xl:flex items-center gap-4 rounded-lg flex-1 max-w-xs bg-sidebar border border-sidebar-accent h-10 px-4">
      <SearchCheckIcon className="w-4 h-4 shrink-0" />
      <input
        className="outline-none focus:outline-none border-none h-full truncate bg-transparent text-sm placeholder:truncate w-full flex-1"
        placeholder="Search or type command"
      />
    </div>
  );
};

export default Searchbar;
