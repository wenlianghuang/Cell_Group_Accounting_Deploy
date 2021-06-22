
const createEmail = (text) => ({
    type: "CREATE_EMAIL",
    text 
})

const createMoney = (number) => ({
    type: "CREATE_MONEY",
    number
})

export default {
    createEmail,
    createMoney
}