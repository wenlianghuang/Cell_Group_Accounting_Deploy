const email = (state = {},action ) => {
    switch(action.type){
        case "CREATE_EMAIL":
            return state.text = action.text
        default:
            return state
    }
}

export default email