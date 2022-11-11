import * as crypto from "crypto";

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac("sha512", "32423ewfsdfaer2312qwfsdsrwe23q4!@#$@#$%DFAE!@#@!SAFRG%$#$@#WQSADSA@!#");
    hmac.update(p);
    return hmac.digest("hex");
};