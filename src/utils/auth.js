import { SEND_COMMENT } from "@/GraphQL/mutations";
import { hash, compare } from "bcryptjs";

const hashPassword = async (password) => {
    const result = await hash(password, 12)
    return result
}

const verifyPassword = async (password, hashPassword) => {
    const result = await compare(password, hashPassword)
    return result
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





export { hashPassword, verifyPassword, numberWithCommas }