import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";

const Home = () => {

  const { user: userPromise } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedUser = await userPromise;
        console.log("Resolved User:", resolvedUser);
        console.log("Fetching data from Supabase...");
        const { data } = await supabase.from("lesson").select("*");
        console.log("Data fetched successfully:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userPromise]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Fetching Failed
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <div className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Home;
