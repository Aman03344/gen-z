import { Tag } from "lucide-react";

const DicountMarque = () => {
  return (
    <div className="w-full py-1.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden border-b border-gray-700">
      <div className="relative flex overflow-x-hidden">
        {/* First marquee track */}
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 mx-4">
              <Tag size={14} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-light tracking-wide">
                <span className="font-medium text-yellow-400">5% discount</span>{" "}
                on online payments
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full mx-2"></span>
              {/* <span className="text-gray-300">Use code: ONLINE5</span> */}
            </div>
          ))}
        </div>

        {/* Second marquee track for seamless loop */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 py-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 mx-4">
              <Tag size={14} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-light tracking-wide">
                <span className="font-medium text-yellow-400">5% discount</span>{" "}
                on online payments
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full mx-2"></span>
              {/* <span className="text-gray-300">Use code: ONLINE5</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DicountMarque;
