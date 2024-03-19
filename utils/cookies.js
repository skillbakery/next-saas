import cookie from 'cookie';

export function parseCookies(req) {
  return cookie.parse(req.headers.cookie || '');
}

export function getUserCookie(req) {
  const cookies = parseCookies(req);
  const userCookie = cookies.user || null;
  try {
    return userCookie ? JSON.parse(userCookie) : null;
  } 
  catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
}