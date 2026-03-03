const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-900 text-white p-3 rounded-lg">
          <Icon size={24} />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trend === "up" ? "+" : "-"}
            {trendValue}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
