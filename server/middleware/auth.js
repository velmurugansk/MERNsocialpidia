import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token) return res.json({status:false,message:`Access Denied`});

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.SECRETKEY);
        req.user = verified;
        next();
    } catch (err) {
        res.json({status:false,message:err.message});
    }
}