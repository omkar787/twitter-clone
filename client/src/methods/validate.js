import axios from "axios"
import jwt_decode from "jwt-decode"

const validate = async () => {
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token")


            const auth = await axios.get("/validate", {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })

            if (auth.data.ok) {
                const data = jwt_decode(token)
                console.log(data);
                return data
            }
        } else {
            return false
        }

    } catch (err) {
        console.log(err);
        return false
    }
}

export default validate