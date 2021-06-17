import {useStyles} from './decoration/stock_decoration'
import React, {useState,useEffect,useContext} from 'react'
import { Stock_AuthButton,To_Deal } from './use-auth'
import {NameandPassword_Login} from './login_user'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import {useSelector} from 'react-redux'
export default function After_Login_Page(){
    const accountUser = useSelector(state => state.login)
    console.log("accountUser: ",accountUser)
    let useContextName = useContext(NameandPassword_Login)
    const classes = useStyles()
    const history = useHistory()
    const goto_stock_platform = () => (history.push("/after_login_page/stock_platform"))
    const goto_delete_content = () => (history.push("/after_login_page/delete_content"))
    const goto_todeal = () => (history.push("/after_login_page/Deal"))
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            {/*<li className="navbar-brand active">
                歡迎來到 {useContextName} 日常收支表
    </li>*/}
            <li className="navbar-brand active">
                歡迎來到 {accountUser}日常收支表
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <Stock_AuthButton/>
                    </li>
                </ul>
            </div>
        </nav>
        
        <div className={classes.root}>
            <Button onClick={goto_stock_platform} style={{fontSize:"43px",fontFamily:"標楷體", top:"200px",width:"200px",left:"-200px",height:"100px"}} variant="outlined" color="primary" backgroundColor="transparent" >存入</Button>
            <Button onClick={goto_delete_content} style={{fontSize:"43px",fontFamily:"標楷體",top:"200px",width:"200px",left:"200px",height:"100px",color:"#ffb366"}} variant="outlined" backgroundColor="transparent">刪除</Button>
            <Button onClick={goto_todeal} style={{fontSize:"43px",fontFamily:"標楷體",top:"200px",width:"200px",left:"400px",height:"100px",color:"#E83195"}} variant="outlined" backgroundColor="transparent">結餘</Button>
        </div>
        </div>
    )
}