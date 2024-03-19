import { supabase } from "../../utils/supabase";
import initStripe from "stripe";
import { getUserCookie } from '../../utils/cookies';

const handler = async (req, res) => {
    const userCookie = getUserCookie(req);
  
    if (!userCookie) {
      return res.status(401).send("Unauthorized");
    }
  
    const {
      data: { stripe_customer },
    } = await supabase
      .from("profile")
      .select("stripe_customer")
      .eq("id", userCookie.id)
      .single();
  
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  
    const session = await stripe.billingPortal.sessions.create({
      customer: stripe_customer,
      return_url: `${process.env.CLIENT_URL}/dashboard`,
    });
  
    res.send({
      url: session.url,
    });
  };
  
  export default handler;