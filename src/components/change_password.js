import React,{useState,useEffect, useCallback} from 'react';

import axios from 'axios'
import {useStyles} from './decoration/stock_decoration'
import { Alert, AlertTitle } from '@material-ui/lab';
export default function ChangePassword(){
    const classes = useStyles()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectMSG] = useState('');
    
    let endpoint = "http://localhost:8080"
    
    
    const getLogIn = async(event) => {
        event.preventDefault();
        await axios.get(endpoint + "/api/accounting").then((res)=>{
            console.log("name: " + name + " email: " + email)
            for(let i = 0; i < res.data.length;i++){
                if(name === res.data[i].account && email === res.data[i].email){
                    handleUpdateLogIn(res.data[i]._id);
                    break;
                }else{
                    setCorrectMSG('Account or Email is not correct');
                    setName('')
                    setEmail('')
                    setPassword('')   
                }
            }
        })
        
    }
    const handleUpdateLogIn = async (id) => {
        await axios.put(endpoint + "/api/changePW/" + id,{
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
            setCorrectMSG('Update the password successfully');
            setName('')
            setEmail('')
            setPassword('')
        }).catch((error)=>{
            console.log("error")
        })
    }
    
    return (
        <div className={classes.homepage}>
            <div style={{position:"relative",top:"20px"}}>
            <form onSubmit={getLogIn}>
                <div className="FirstPageLabelInputPadding">
                    <lable className="FirstPageLabel">Your Name</lable>
                    <input
                    style={{width:"300px",margin:"auto"}}  
                    type="text" 
                    value={name} 
                    placeholder={"Original Account"} 
                    onChange={(e)=>setName(e.target.value)} className="form-control"
                    style={{width:"300px",margin:"auto"}}
                    />
                </div>
                
                <div className="FirstPageLabelInputPadding">
                    <label className="FirstPageLabel">Your Email</label>
                    <input 
                    style={{width:"300px",margin:"auto"}}
                    type="text" 
                    value={email} 
                    placeholder={"Original Email"} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="form-control" />
                </div>
                <div className="FirstPageLabelInputPadding">
                    <label className="FirstPageLabel">Change Password</label>
                    <input
                    style={{width:"300px",margin:"auto"}} 
                    type="text" value={password} 
                    placeholder={"Modify Password"} 
                    onChange={(e)=>setPassword(e.target.value)}  
                    className="form-control" 
                    />
                </div>
                <div className="FirstPageLabelInputPadding">
                    {correct ? (
                        <>
                        <input type="submit" value="Create User" className="btn btn-success btn-block" style={{width:"400px",margin:"auto"}}/>
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    ):(
                        <>
                        <input type="submit" value="Create User" className="btn btn-success btn-block"  style={{width:"400px",margin:"auto"}}/>
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    )}
                </div>
            </form>
            </div>
        </div>
    )
}