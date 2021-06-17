
/*const initailState = {
    text: ""
}*/

const login = (state = {},action) => {
    switch(action.type){
        case "ADD_LOGIN_ACCOUNT":
            return state.text = action.text
        default:
            return state;
    }
}


export default login