import Link from "next/link";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";

const Nav = () => {
  const { user: userPromise } = useUser();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data:{user}} = await userPromise;
        console.log("Resolved User:", user);
        setUser(user); // Set the user state
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } 
    };
    fetchData();
  }, [userPromise]);

  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">
        <div>Home</div>
      </Link>
      <Link href="/pricing">
        <div className="ml-2">Pricing</div>
      </Link>
      {!!user && (
        <Link href="/dashboard">
          <div className="ml-2">Dashboard</div>
        </Link>
      )}
      <Link href={user? "/logout" : "/login"}>
        <div className="ml-2">{user ? "Logout" : "Login"}</div>
      </Link>
    </nav>
  );
};

export default Nav;