import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        console.log(token && isCustomAuth)
        
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'sanket');
            
            console.log(decodedData);
            req.userId = decodedData?.id;
        } else {
            --trace-warnings
            const response = fetch("https://oauth2.googleapis.com/tokeninfo?id_token="+token);
            const data = await response.json();
            console.log(data.sub);

            req.userId = await data.sub;
        }
        next();
    } catch (err) {
        res.status(500).json({ error: "Authentication error" });
    }
}

export default auth;