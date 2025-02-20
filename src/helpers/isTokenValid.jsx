import jwtDecode from "jwt-decode";

function isTokenValid(token) {
    if (!token) {
        console.error("Geen token opgegeven.");
        return false;
    }

    try {
        const { exp } = jwtDecode(token);

        if (!exp) {
            console.error("Token mist een expiratietijd (exp-claim).");
            return false;
        }

        return exp > Math.floor(Date.now() / 1000);
    } catch (error) {
        console.error("Ongeldig token:", error.message);
        return false;
    }
    }

export default isTokenValid;