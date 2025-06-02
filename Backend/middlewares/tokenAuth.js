import jwt from "jsonwebtoken";



function authenticateToken(req, res, next) {
    console.log("authenticate page");
    console.log(req.cookies)
    const token = req.cookies.authToken;  // Read the token from the client's cookies
    if (!token) {
        console.log("no token")
        
        return res.status(401).send('failure');
    }
  
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Verify the token
        req.user = verified;
        console.log(req.user)
        next();  // Continue to the next middleware or route handler
    } catch (err) {
        console.log("invalid")
        res.status(400).send('Invalid Token');
    }

}

export default authenticateToken;