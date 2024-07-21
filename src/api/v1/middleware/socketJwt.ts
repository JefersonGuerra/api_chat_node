import jwt from "jsonwebtoken";

export default function socketJwt(token: string) {

    return jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, function (err, decoded) {
        if (err) return 401;
        if (decoded) return 200;
        return 500;
    });
}
