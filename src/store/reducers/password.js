const password = (state = {},action) => {
    switch(action.type){
        case "ADD_LOGIN_PASSWORD":
            return state.text = action.text
        default:
            return state;
    }
}   

export default password