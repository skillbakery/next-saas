import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { event, user } = req.body;
    
    if (event === 'SIGNED_IN') {
            // Set the user cookie
            const userString = JSON.stringify(user);
            const userCookie = serialize('user', userString, {
                httpOnly: true,
                maxAge: 604800, // 7 days in seconds
                path: '/',
            });

            res.setHeader('Set-Cookie', [userCookie]);
            res.status(200).json({ success: true, message: 'User cookie set successfully.' });
        } 
    }
}