import React,{useState,useEffect,useContext,useCallback,createContext} from 'react';
import axios from 'axios'
import {useStyles,
        NameandNumberTextField,
        BootstrapInput,
        PriceTextField,
        DealBuyButton,
        DealSellButton} from './decoration/stock_decoration';
import InputLabel from '@material-ui/core/InputLabel';
import FormContral from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import './components.css';
import { ProvideAuth,PrivateRoute,ProtectedPage,LoginPage,AuthButton,useAuth,Stock_AuthButton,To_Deal,Back_To_Platform } from './use-auth';
import {NameandPassword_Login,YourID} from './login_user';
import {Endpoint} from '../GlobalEndPoint'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



export default function Stock_Platform() {
    /*const [stockname,setStockName] = useState('');
    const [stocknumber,setStockNumber] = useState('');
    const [stockprice,setStockPrice] = useState('');*/
    const [item,setItem] = useState('')
    const [buyorsell,setStockBuyorSell] = useState("buy");//true is "buy"
    const [price,setPrice] = useState('')//price of each item
    const [deal,setDeal] = useState(false);
    const [dealmsg,setDealmsg] = useState('');
    const [selectedDate,setSelectDateChange] = useState(new Date());
    /*const {loading,error,data,subscribeToMore} = useQuery(STOCK_QUERY);
    const [addStock] = useMutation(CREATE_STOCK_MUTATION)*/
    const classes = useStyles();
    const useContextNameandPassword = useContext(NameandPassword_Login);
    const useContextName = useContextNameandPassword;
    const useContextYourID = useContext(YourID);
    //let endpoint = "http://localhost:8080"

    
    
    

    
    const handleItem = (e) => {
        setItem(e.target.value)
    }
    const handleBuyorSell = (e) =>{
        setStockBuyorSell(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    /*const handleDate = (e) =>{
        setSelectDateChange(e.target.value);
    }*/
    
    const handleDateChange = (e) =>{
        setSelectDateChange(e.target.value)
    }



    let tmpdate = selectedDate.toString();
    var detailDate = new Date();
    detailDate = detailDate.getFullYear() + "-" + `0${detailDate.getMonth()+1}` + "-" + detailDate.getDate();
    console.log(detailDate);
    console.log(typeof(detailDate))

    let numberPrice = parseInt(price)
    console.log("_id: ",useContextYourID)
    console.log("selected_date: ",selectedDate)
    const handleSubmit =  async (event) =>{
        event.preventDefault();
        await axios
            .post(
                Endpoint + "/api/accounting/" + useContextYourID ,
            {
                item: item,
                buyorsell: buyorsell,
                selecteddate: selectedDate,
                price: numberPrice,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        ).then((res)=>{
            setItem('')
            setStockBuyorSell('')
            setSelectDateChange('')
            setPrice('')
            setDeal(true);
        }).catch((error)=>{
            console.log("error")
        })
        
        
    }


    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {useContextName} 日常收支表
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    
                    <li className="nav-item active">
                        <To_Deal/>
                    </li>
                    <li className="nav-item active">
                        <Stock_AuthButton/>
                    </li>
                    <li className="nav-item active">
                        <Back_To_Platform/>
                    </li>    
                </ul>
            </div>
        </nav>
        
        <form className={classes.root} noValidate autoCapitalize="off" onSubmit={handleSubmit} style={{backgroundColor: "fff00"}}>
            <div>
                <NameandNumberTextField
                    className={classes.marginInFirstTwoItem}
                    label="明細"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    onChange={handleItem}
                />
            </div>
                <PriceTextField 
                    className={classes.marginInPrice}
                    label="價格"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    onChange={handlePrice}
                />
            
            <div>
                <TextField
                    id="date"
                    label="Accounting Book"
                    type="date"
                    defaultValue={selectedDate}
                    value={selectedDate}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={handleDateChange}
            
                /> 
            </div>
            <div>
                <RadioGroup row aria-label="quiz" name="quiz" value={buyorsell} onChange={handleBuyorSell}>
                    <FormControlLabel value="buy" control={<Radio />} label="支出" className={classes.buyradio} />
                    <FormControlLabel value="sell" control={<Radio />} label="收入" className={classes.sellradio} />
                </RadioGroup>
            </div>
            
            <div>
                { deal ? (
                    <DealBuyButton type="submit" variant="outlined" color="primary" >
                        交易
                    </DealBuyButton> 
                ) : (
                    <DealSellButton type="submit" variant="outlined" color="primary">
                        交易
                    </DealSellButton>
                )}
            </div>
        </form>
        </>
    )
}