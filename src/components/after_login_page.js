import {useStyles,useheaderStyles} from './decoration/stock_decoration'
import React, {useState,useEffect,useContext} from 'react'
import { Stock_AuthButton,To_Deal } from './use-auth'
import {NameandPassword_Login} from './login_user'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {useSelector} from 'react-redux'
import {useSpring,animated} from 'react-spring'


export default function After_Login_Page(){
    const accountUser = useSelector(state => state.login)
    const accountPassword = useSelector(state => state.password)
    console.log("accountUser: ",accountUser)
    console.log("accountPassword: ",accountPassword)
    let useContextName = useContext(NameandPassword_Login)
    const classes = useStyles()
    const subclasses = useheaderStyles()
    const history = useHistory()
    const goto_stock_platform = () => (history.push("/after_login_page/stock_platform"))
    const goto_delete_content = () => (history.push("/after_login_page/delete_content"))
    const goto_todeal = () => (history.push("/after_login_page/Deal"))
    
    const [state,toggle] = useState(true);
    const { x } = useSpring({
        from: {x : 0},
        x: state ? 1 : 0,
        config: {duration: 1000},
    })


    return(
        <div>
        {/*
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <li className="navbar-brand active">
                歡迎來到 {accountUser}日常收支表
            </li>
            <div>
                <Button
                    variant="contained"
                    style={{color: "white",backgroundColor: "#E3EA0B"}}
                    endIcon={<EmailIcon/>}
                    
                    className={subclasses.button}
                    >Email</Button>
                <Button
                    variant="contained"
                    style={{color: "white",backgroundColor: "#ACE64C"}}
                    endIcon={<AccountBalanceIcon/>}
                    className={subclasses.button}
                    onClick={goto_todeal}
                    >Balance</Button>
                <Stock_AuthButton/>
            </div>
            
            
        </nav>
        */}
        <div className={classes.root} onClick={()=>toggle(!state)}>
            <animated.h2 style={{
                opacity: x.to({range:[0,1],output:[0.3,1]}),
                scale: x.to({
                    range:[0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                }),

                }}><span style={{color: "#E2ACD2",fontFamily: "BiauKai"}}>歡迎來到 <span style={{fontFamily: "fantasy"}}>{accountUser}</span>日常收支表</span>
            </animated.h2>
            <div>
                <Button
                    variant="contained"
                    style={{color: "white",backgroundColor: "#E3EA0B"}}
                    endIcon={<EmailIcon/>}
                    
                    className={subclasses.button}
                    >Email</Button>
                <Button
                    variant="contained"
                    style={{color: "white",backgroundColor: "#ACE64C"}}
                    endIcon={<AccountBalanceIcon/>}
                    className={subclasses.button}
                    onClick={goto_todeal}
                    >Balance</Button>
                <Stock_AuthButton/>
            <Button onClick={goto_stock_platform} style={{fontSize:"43px",fontFamily:"楷體",width:"200px",left:"-200px",height:"100px"}} variant="outlined" color="primary" backgroundColor="transparent" >存入</Button>
            <Button onClick={goto_delete_content} style={{fontSize:"43px",fontFamily:"楷體",width:"200px",left:"200px",height:"100px",color:"#ffb366"}} variant="outlined" backgroundColor="transparent">刪除</Button>
            </div>
        </div>
        </div>
    )
}