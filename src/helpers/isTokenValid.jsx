import  jwtDecode  from "jwt-decode";

function isTokenValid(token) {
    try {
        // Log token for debugging purposes (optional)
        console.log("Token:", token);

        // Decode the token and handle potential errors
        const decodedToken = jwtDecode(token);

        // Ensure the decoded token has an 'exp' (expiration time) claim
        if (!decodedToken.exp) {
            console.error("Token mist claim voor vervaltijd .");
            return false;
        }

        // Calculate expiration time in seconds
        const expirationTime = decodedToken.exp;

        // Check if token is expired using current time in seconds
        const currentTime = Math.floor(Date.now() / 1000); // More efficient for seconds
        return expirationTime > currentTime;
    } catch (error) {
        console.error("Fout bij het decoderen van token:", error);
        return false;
    }
}

export default isTokenValid;