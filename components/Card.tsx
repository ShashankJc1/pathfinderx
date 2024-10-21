interface CardProps {
  title: string;
  value: string;
  icon?: React.ReactNode; // Optional icon prop
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        {icon && <div className="text-3xl text-teal-500">{icon}</div>}
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
