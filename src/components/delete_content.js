import React,{useState,useEffect,useContext } from 'react'
import axios from 'axios'
import {NameandPassword_Login,YourID} from './login_user';
import {useStyles,
        NameandNumberTextField,
        PriceTextField,
        DealBuyButton,
        DealSellButton,
        } from './decoration/stock_decoration'
import TextField from '@material-ui/core/TextField'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import {Stock_AuthButton,To_Deal,Back_To_Platform} from './use-auth'
import {Endpoint} from '../GlobalEndPoint'

import {useSelector} from 'react-redux'
export default function Delete_Content(){
    const [item,setItem] = useState('')
    const [buyorsell,setStockBuyorSell] = useState("buy");//true is "buy"
    const [price,setPrice] = useState('')//price of each item
    const [deal,setDeal] = useState(false);
    const [selectedDate,setSelectDateChange] = useState('');

    const classes = useStyles();
    const useContextNameandPassword = useContext(NameandPassword_Login);
    const useContextYourID = useContext(YourID);
    //let endpoint = "http://localhost:8080"
    const accountUser = useSelector(state => state.login)
    const handleItem = (e) => {
        setItem(e.target.value)
    }
    const handleBuyorSell = (e) =>{
        setStockBuyorSell(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleDateChange = (e) =>{
        setSelectDateChange(e.target.value);
    }

    let numberPrice = parseInt(price)
    
    const getDeleteContent = async (event)=>{
        event.preventDefault()
        await axios.get(Endpoint + "/api/accounting/" + useContextYourID).then((res)=>{
            //console.log("name: " + name + " email: " + email + " password: " + password)
            console.log("res.data.subtest: ",res.data.subtest)
            let Intprice = parseInt(price)
            console.log("Item: " + item + ",Price: " + Intprice + ",BuyorSell: " + buyorsell + ",Date: "+ selectedDate + " ")
            for(let i = 0; i < res.data.subtest.length;i++){
                if(item === res.data.subtest[i].item && Intprice === res.data.subtest[i].price && selectedDate === res.data.subtest[i].selecteddate && buyorsell === res.data.subtest[i].buyorsell ){
                    console.log("Get it!!!!")
                    handleSubmit(res.data._id)
                    break;
                }else{
                    continue;
                }
            }
        }).catch((error)=>{
            console.log("error")
        })
    }
    const handleSubmit =  async (id) =>{
        console.log("numberPrice: ",numberPrice)
        //event.preventDefault();
        await axios
            .put(
                Endpoint + "/api/deleteCount/" + id ,
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
            console.log(res)
            setItem('')
            setStockBuyorSell('')
            setSelectDateChange('')
            setPrice('')
            setDeal(true);
        });
        
        
    }

    return(
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {accountUser} 日常收支表
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

        <form className={classes.root} noValidate autoCapitalize="off" onSubmit={getDeleteContent} style={{backgroundColor: "fff00"}}>
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
    </div>
    )
}