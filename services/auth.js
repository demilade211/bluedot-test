import axios from ".";
import Router from "next/router" 
import cookie from "js-cookie"

const Axioss = axios.create({
    baseURL: `https://spinel-backend.onrender.com`,
    headers: { Authorization: cookie.get("token") }
})


export const registerUser = async (user, setSnackInfo, setButtonDisabled, setLoading) => {

    try {

        console.log(user)
        const res = await axios.post(`/api/v1/register`, user)

        const { success, message, token } = res.data

        return res.data
       

    } catch (error) {
        return error
    }

}

export const loginUser = async (user ) => {
    try {
        const res = await axios.post(`/api/v1/login`, user)

        const { success, message, token, name } = res.data

        return res.data 

    } catch (error) {
        return error
    }

}

export const sendOtp = async (email) => {
    try {
        const res = await axios.post(`/api/v1/email/send`, email)
        return res.data 

    } catch (error) {
        return error
    }

}

export const verifyEmailOtp = async (otp, setSnackInfo, setButtonDisabled, setLoading) => {
    try {
        const res = await axios.post(`/api/v1/verify/otp`, otp)
        const { success, message } = res.data

        if (success === true) {
            setSnackInfo(prev => ({ ...prev, openSnack: true, type: "success", message: message }))
        } else {
            setSnackInfo(prev => ({ ...prev, openSnack: true, type: "warning", message: message }));
            setButtonDisabled(false);
            setLoading(false);
        }

    } catch (error) {
        setButtonDisabled(false);
        setLoading(false);
        setSnackInfo(prev => ({ ...prev, openSnack: true, type: "error", message: catchErrors(error) }))
    }

}

export const getLoggedInUser = async () => {


    try {
        const res = await axios.get(`/api/v1/me`)

        const { success, message } = res.data
        return res.data 

    } catch (error) {
        return error.response.data;

    }


}


export const sendUserQuotation = async (data) => {

    try {
 
        const res = await axios.post(`/api/v1/products/quotation`, data)

        const { success, message, token } = res.data

        return res.data
       

    } catch (error) {
        return error
    }

}



export const redirectUser = (ctx, location) => {
    if (ctx.req) {//if it get a req
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end();
    } else {
        Router.push(location);
    }

}
export const logOut = () => {
    cookie.remove("token");
    Router.push("/auth/login");
    Router.reload()
}
const setToken = token => {
    cookie.set("token", token)
    Router.push('/')
}