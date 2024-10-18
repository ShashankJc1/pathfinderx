import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  className?: string; // Add className to allow custom styles
  onClick?: () => void; // Optional onClick prop
};

const Button = ({ type, title, icon, variant, full, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'} ${className}`} // Use className prop here
      type={type}
      onClick={onClick} // Attach the onClick handler
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  );
};

export default Button;
