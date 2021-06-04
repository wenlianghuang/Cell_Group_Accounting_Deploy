// ** create-user.component.js ** //

import React, {useState,useEffect,useCallback} from 'react';
import {useStyles} from './decoration/stock_decoration'
import axios from 'axios'
import "./components.css"
import {Endpoint} from '../GlobalEndPoint'
export default function CreateUse() {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [total_money,setTotal_Money] = useState('');
    //const [correct,setCorrect] = useState(true)
    const [correctmsg,setCorrectMsg] = useState('')
    
    const classes = useStyles()

    //let endpoint = "http://localhost:8080";
    
    let initmoney = parseInt(total_money);
    const handleCreate = async (e) => {
        e.preventDefault()
        if(name == "" || password == "" || email == "" || total_money == ""){
            //setCorrect(false)
            setCorrectMsg("Please Input your name, password, email or total_money")
            return
        }
        await axios
            .post(
                Endpoint + "/api/accounting",
                {
                    account: name,
                    password: password,
                    email: email,
                    initmoney: initmoney,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            ).then((res)=>{
                setName('')
                setPassword('')
                setEmail('')
                setTotal_Money('')
                setCorrectMsg("Successfully")
            }).catch((error)=>{
                console.log("error")
            })
    }

        return (
            <div className={classes.homepage}>
                <div style={{position:"relative",top:"20px"}}>
                <form onSubmit={handleCreate}>
                    <div className="FirstPageLabelInputPadding">
                        <label className="FirstPageLabel">Add User Name</label>
                        <input 
                        style={{width:"300px",margin:"auto"}} 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        className="form-control" 
                        placeholder="Create the Account" 
                        />
                    </div>
                    <div className="FirstPageLabelInputPadding">
                        <label className="FirstPageLabel">Add User Password</label>
                        <input 
                        style={{width:"300px",margin:"auto"}} 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        className="form-control" 
                        placeholder="Crate the Password" 
                        />
                    </div>
                    <div className="FirstPageLabelInputPadding">
                        <label className="FirstPageLabel">Add User Email</label>
                        <input 
                        style={{width:"300px",margin:"auto"}} 
                        type="text" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        className="form-control" placeholder="Create the Email" 
                        />
                    </div>
                    <div className="FirstPageLabelInputPadding">
                        <lable className="FirstPageLabel" >Initial Money</lable>
                        <input 
                        style={{width:"300px",margin:"auto"}} 
                        type="text" value={total_money} 
                        onChange={(e)=>setTotal_Money(e.target.value)} 
                        className="form-control" 
                        placeholder="Your Initial Money"
                        />
                    </div>
                    
                    <div className="FirstPageLabelInputPadding">
                        <input 
                        style={{width:"400px",margin:"auto"}} 
                        type="submit" value="Sign up Your Stock Account" 
                        className="btn btn-success btn-block" 
                        />
                    </div>
                </form>
                <p className="CannotSignIn">{correctmsg}</p>
                </div>
            </div>
        )
}