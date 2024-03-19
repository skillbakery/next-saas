import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import axios from "axios";

const Context = createContext();
// Export the context and the useUser hook
const Provider  = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(supabase.auth.getUser());
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getUserProfile = async () => {
        const {data:{ session }} = await supabase.auth.getSession();
       
        if (session?.user) {
         
          const { data: profile } = await supabase
            .from("profile")
            .select("*")
            .eq("id", session?.user.id) //"4f232603-af4d-4260-9150-a7c6ee158cdf"
            .single();
          
            console.log("calling session user" + session?.user.id);
          setUser({
            ...session?.user,
            ...profile,
          });
          setSession(session);

        }
        setIsLoading(false);
      };
  
      getUserProfile();
  
      supabase.auth.onAuthStateChange(() => {
        getUserProfile();
      });
    }, []);

    useEffect(() => {
      axios.post("/api/set-supabase-cookie", {
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        user: user,
      });
    }, [user]);

    const login = async () => {
     supabase.auth.signInWithOAuth({
            provider: "github",
          });
      };

    const logout = async () => {
     supabase.auth.signOut();
        setUser(null);
        router.push("/");
      };

      const exposed = {
        user,
        login,
        logout,
        isLoading
      };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
}
export const useUser = () => useContext(Context);

export default Provider;