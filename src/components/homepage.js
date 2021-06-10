import React,{useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom'
import { yellow } from '@material-ui/core/colors';
import {useStyles} from './decoration/stock_decoration'
import {useSpring,animated as a} from 'react-spring'
import './components.css'
export default function HomePage(){
    const classes = useStyles()
    const [greetingStatus, displayGreeting] = useState(false);
    const contentProps = useSpring({
        opacity: greetingStatus ? 0.7 : 0,
        marginTop: greetingStatus ? 50 : -500
    })
    const handleButton = () => {
        displayGreeting(!greetingStatus)
    }
    return(

        
        <div className={classes.homepage}>
           <button onClick={handleButton} className="round-button" style={{fontFamily:"標楷體"}}>
                詳細說明
           </button>
           {/*<h2 style={{color:"#2E4053",position:"relative",top:"300px",fontFamily:"fantasy",fontSize:"75px"}}>Welcome to Cell Group Accounting Book</h2>*/}
           <h2 style={{color:"#2E4053",position:"relative",top:"0px",fontFamily:"fantasy",fontSize:"75px"}}>Welcome to Cell Group Accounting Book</h2>

           {!greetingStatus ? (<div></div>) : (
            <a.div style={contentProps}>
                <ol style={{width:"80%",margin:"auto",paddingLeft:0,listStylePosition:"inside",textAlign:"left",fontSize:"20px",paddingTop:"1.5rem",fontFamily:"fantasy"}}>
                <li>Button the Log In, if you do not have the account, it will show error</li>
                <li>Button the Create Account, add your user name, user password, user email and deposite your money</li>
                <li>Log In to the accounting book page and you can see the using item, using type,the price of item, date, and to check it is income your expense</li>
                <li>Then you will see three buttons "存入","刪除","結餘"</li>
                <li>Press the button "存入" if you want to write down some items to the accounting book</li>
                <li>Press the button "刪除" if you want to delete the item to the accounting book</li>
                <li>Press the button "結餘" if you want to see the accounting book detail</li>
                <li>Press the button "To Deal" of the upper right and it will redirect to your accounting page </li>
                <li>Add the "請看收入支出明細" button and it will show the result</li>
                <li>Please email to "wenlianghuang@gmail.com" if you have any problem</li>
            </ol>
            </a.div>
        )}
        
       
       {/*
        <ol style={{width:"80%",margin:"auto",paddingLeft:0,listStylePosition:"inside",textAlign:"left",fontSize:"20px",paddingTop:"1.5rem"}}>
            <li>Button the Log In, if you do not have the account, it will show error</li>
            <li>Button the Create Account, add your user name, user password, user email and deposite your money</li>
            <li>Log In to the accounting book page and you can see the using item, using type,the price of item, date, and to check it is income your expense</li>
            <li>Press the button "交易" and the trade success</li>
            <li>Press the button "To Deal" of the upper right and it will redirect to your accounting page </li>
            <li>Add the "請看收入支出明細" button and it will show the result</li>
            <li>There are five bottom buttons(Food,Clothing,Accommodation,Transport,Others),you go into each page</li>
        </ol>
       */}
        </div>
    )
}