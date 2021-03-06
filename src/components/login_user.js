import React,{useState,useEffect,useContext,createContext} from 'react';
import axios from 'axios';
import { Link,NavLink,useHistory,useLocation,Redirect,Route } from 'react-router-dom';
import "./components.css";

import { ProvideAuth,PrivateRoute,ProtectedPage,LoginPage,AuthButton,useAuth } from './use-auth';
import {useStyles} from './decoration/stock_decoration'
import {Endpoint} from '../GlobalEndPoint'

//Redux
import allAction from "../store/action"
import {useSelector,useDispatch} from 'react-redux'

export let NameandPassword_Login = {};//Stock Platform will recieve this variable of name and password
export let Account_Total_Money = ''
export let YourID = {}
export default function LogInUser(){
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectmsg] = useState('');
    
    const classes = useStyles();
    
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/after_login_page",state: {reload: true} } };
    let login = () => {
        auth.signin(() => {
          history.replace(from);
        });
    };
    
    const accountUser = useSelector(state => state.login)
    const accountPassword = useSelector(state => state.password)
    const dispatch = useDispatch()
    //let endpoint = "http://localhost:8080"
    const handleCreate = async (e) => {
        e.preventDefault()
        await axios.get(Endpoint + "/api/accounting").then((res)=>{
            if(res.data){

                //console.log(res.data[0].account)
                for(let i = 0; i < res.data.length;i++){
                    if(res.data[i].account === name && res.data[i].password === password){
                        setCorrect(true);
                        setCorrectmsg('Update the password successfully');
                        NameandPassword_Login = createContext( res.data[i].account );
                        YourID = createContext(res.data[i]._id)
                        //addLogInAccount(res.data[i].account)
                        break;
                    }else{
                        setCorrectmsg('Account or Password is not correct,please check them or create a new account');
                    }
                }
                dispatch(allAction.loginaccount.addLogInAccount(name))
                dispatch(allAction.loginaccount.addLogInPassword(password))
                console.log("name: ",accountUser)
                console.log("password: ",accountPassword)
            }
            
            setName('')
            setPassword('')
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div className={classes.homepage}>
            <div style={{position:"relative",top:"20px"}}>
            <form onSubmit={handleCreate}>
                <div className="FirstPageLabelInputPadding">
                    <lable className="FirstPageLabel">Account</lable>
                    <input
                        style={{width:"300px",margin:"auto"}}
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        placeholder="Your Name"
                        className="form-control" />
                </div>
                
                <div className="FirstPageLabelInputPadding">
                    <label className="FirstPageLabel">Password</label>
                    <input
                        style={{width:"300px",margin:"auto"}}
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Your Password" 
                        className="form-control" />
                </div>
                
                <div className="FirstPageLabelInputPadding"> 
                    {correct?(
                        <div>
                        <input type="submit" value="Sign in" onClick={login()} className="btn btn-success btn-block" style={{width:"400px",margin:"auto"}}/>
                        </div>
                    ):(<div>
                        <input type="submit" value="Sign in" className="btn btn-success btn-block" style={{width:"400px",margin:"auto"}} />
                        <p className="CannotSignIn">{correctmsg}</p>
                       </div>
                    )
                    }
                </div>
            </form>
            </div>
        </div>
    )

}