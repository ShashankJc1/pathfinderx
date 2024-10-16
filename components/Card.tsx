interface CardProps {
    title: string;
    value: string | number;
  }
  
  export default function Card({ title, value }: CardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }
  