import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Logout", href: "/login" },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0"; // Clear the token
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside className="w-64 bg-green-50 p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="space-y-4">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block hover:font-bold">
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="text-red-500 mt-4 hover:underline"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
