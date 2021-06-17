import {useDispatch,useSelector} from 'react-redux'
import {useCallback} from 'react'
import {addLogInAccount} from './action'

export const useAccountStore = () => {
    const dispatch = useDispatch();
    //const account = useSelector(selectDisplayed)

    const _addLogInAccount = useCallback(text => dispatch(addLogInAccount(text)),[dispatch])

    return {
        //account,
        addLogInAccount: _addLogInAccount,
    }
}