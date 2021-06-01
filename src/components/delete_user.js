import React,{useState,useEffect, useCallback} from 'react';

import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';
import {useStyles} from './decoration/stock_decoration'
export default function ChangePassword(){
    const classes = useStyles()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [total_money,setTotalMoney] = useState(0);
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectMSG] = useState('');
    let endpoint = "http://localhost:8080"
    
    
    const getDeleteLogIn = async (event)=>{
        event.preventDefault()
        await axios.get(endpoint + "/api/accounting").then((res)=>{
            console.log("name: " + name + " email: " + email + " password: " + password)
            for(let i = 0; i < res.data.length;i++){
                if(name === res.data[i].account && email === res.data[i].email && password === res.data[i].password){
                    handleDeleteLogIn(res.data[i]._id);
                    break;
                }else{
                    setCorrectMSG('Account or Email or Password is not correct');
                    setName('')
                    setEmail('')
                    setPassword('')   
                }
            }
        })
        .catch((err)=>{
            console.log("error")
        })
    }

    const handleDeleteLogIn = async (id) => {
        await axios.delete(endpoint + "/api/deleteAccount/" + id,{
            account: name,
            password: password,
            email: email,

        },{
            
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then((res)=>{
            console.log(res)
            setCorrect(true)
            setCorrectMSG('Delete the password successfully');
            setName('')
            setEmail('')
            setPassword('')
        })
    }

    
   
    return (
        <div className={classes.homepage}>
            <div style={{position:"relative",top:"20px"}}>
            <form onSubmit={getDeleteLogIn}>
                <div className="FirstPageLabelInputPadding">
                    <lable className="FirstPageLabel">Deleted Name</lable>
                    <input 
                    style={{width:"300px",margin:"auto"}}  
                    type="text" 
                    value={name} 
                    placeholder={"Original Account"} 
                    onChange={(e)=>setName(e.target.value)} 
                    className="form-control" />
                </div>
                
                <div className="FirstPageLabelInputPadding">
                    <label className="FirstPageLabel">Deleted Email</label>
                    <input
                    style={{width:"300px",margin:"auto"}} 
                    type="text" 
                    value={email} 
                    placeholder={"Original Email"} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="FirstPageLabelInputPadding">
                    <label className="FirstPageLabel">Deleted Password</label>
                    <input 
                    style={{width:"300px",margin:"auto"}}
                    type="password" 
                    value={password} 
                    placeholder={"Original Password"} 
                    onChange={(e)=>setPassword(e.target.value)}  
                    className="form-control" 
                    />
                </div>
                <div className="FirstPageLabelInputPadding">
                    {correct ? (
                        <>
                        <input type="submit" value="Delete Account" className="btn btn-success btn-block" style={{width:"400px",margin:"auto"}} />
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    ):(
                        <>
                        <input type="submit" value="Delete Account" className="btn btn-success btn-block" style={{width:"400px",margin:"auto"}}/>
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    )}
                </div>
            </form>
            </div>
        </div>
    )
}