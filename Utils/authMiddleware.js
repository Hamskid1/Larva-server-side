import jwt from "jsonwebtoken";

export const headerAuth = (req, res, next) => {
    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer')) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = header.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
