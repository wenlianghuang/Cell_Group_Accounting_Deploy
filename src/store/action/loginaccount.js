const addLogInAccount = (text) =>({
    type: "ADD_LOGIN_ACCOUNT",
    text
})

const addLogInPassword = (text) => ({
    type: "ADD_LOGIN_PASSWORD",
    text
})


export default {
    addLogInAccount,
    addLogInPassword
}