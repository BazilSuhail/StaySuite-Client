 
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = payload.exp * 1000 < Date.now();
      return !isTokenExpired;
    }
    catch (err) {
      console.warn('Invalid token structure');
      return false;
    }
  };