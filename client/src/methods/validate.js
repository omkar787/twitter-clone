import jsonwebtoken from "jsonwebtoken"

const validate = () => {
    const promise = new Promise(async (resolve, reject) => {
        const data = jsonwebtoken.verify(localStorage.getItem("token"), process.env.REACT_APP_JWT_KEY)
        // console.log(data);
    })

    return promise
}



export default validate