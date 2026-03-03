const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
