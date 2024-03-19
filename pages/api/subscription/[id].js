import { supabase } from "../../../utils/supabase";
import { getUserCookie } from '../../../utils/cookies';
import initStripe from "stripe";

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
    const { id } = req.query;
    
    
    const lineItems = [
      {
        price: id,
        quantity: 1,
      },
    ];
  
    const session = await stripe.checkout.sessions.create({
      customer: stripe_customer,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
    });
  
    res.send({
      id: session.id,
    });

  // res.send({
  //   ...userCookie,
  //   stripe_customer,
  // });
};

export default handler;