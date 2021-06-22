const initialmoney = (state = {},action) => {
    switch(action.type){
        case "CREATE_MONEY":
            return state.number = action.number
        default:
            return state
    }
}

export default initialmoney