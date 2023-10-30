import CryptoJS from "crypto-js";


export const saveToken = (data) => {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("userName", data?.name);
    localStorage.setItem("userEmail", data?.email);
    localStorage.setItem('userId', CryptoJS.AES.encrypt((data?._id), 'shortify').toString())
};

export const saveEmail = (data) => {
    localStorage.setItem("email", data)
}

export const getSavedEmail = ()=>{
    return localStorage.getItem("email")
}

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getuserId = () => {
    const userId = localStorage.getItem('userId')
    return CryptoJS.AES.decrypt(userId, 'shortify').toString(CryptoJS.enc.Utf8)
};

export const getuserName = () => {
    return localStorage.getItem('userName')
};

export const clearStorage = () => {
    localStorage.clear()
};
