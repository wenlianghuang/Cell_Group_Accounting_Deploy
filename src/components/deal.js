

//React and related library
import React,{useState,useEffect,useCallback,useContext} from 'react';
import {NavLink,Link,Redirect,useParams,useHistory} from 'react-router-dom'; 

//Link to my local .js file
import {NameandPassword_Login,YourID} from './login_user';
import {stockfromplatform}  from './stock_platform';
import {Account_Total_Money} from './login_user';
import {fullDate} from './stock_platform';

//Graphql
import {useQuery} from '@apollo/react-hooks';
import {
    STOCK_QUERY,
    STOCK_SUBSCRIPTION,
} from '../graphql';
import {Stock_AuthButton,To_Deal } from './use-auth';

//About Table Module
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import Button from '@material-ui/core/Button';

import {ShowYourList} from './decoration/stock_decoration';
import {columns,useDealStyles} from './dealtable_detail';
import axios from 'axios';


export default function Deal(){
    let endpoint = "http://localhost:8080";
    const classes = useDealStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let history = useHistory();
    function handleHistory(){
        history.push("/after_login_page");
    }

    
    const [deal,setDeal] = useState(false);
    const [rows,setRows] = useState([])
    const [total_money,setTotal_Money] = useState(0)
    const useContextYourID = useContext(YourID);
    const useContextName = useContext(NameandPassword_Login)
    let Bank_Account_Price = 0;
    function createData(item, price, buyorsell, selecteddate) {
        return { item, price, buyorsell, selecteddate};
    }
      
    const handleDetail = async (event) => {
        event.preventDefault();
        console.log("deal id: ",useContextYourID)
        await axios.get( endpoint + "/api/accounting/" + useContextYourID).then((res)=>{
          if(res.data){
            setTotal_Money(res.data.initmoney)
            for(let i = 0; i < res.data.subtest.length;i++){
                let newArray = createData(
                  res.data.subtest[i].item,
                  res.data.subtest[i].price,
                  res.data.subtest[i].buyorsell,
                  res.data.subtest[i].selecteddate 
                )
                setRows(rows => [...rows,newArray])
            }
            setDeal(true)
          }
        }).catch((error)=>{
          console.log("errors")
        })
    }
    
    
    
    console.log("total_money: ",total_money)
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {useContextName} 日常收支表
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Stock_AuthButton/>
                    </li>
                    <li className="nav-item active">
                      <Button onClick={handleHistory} variant="contained" color="primary" style={{padding:"15px"}}>Back To Platform</Button>
                    </li>
                    
                </ul>
            </div>
        </nav>
        <div className={classes.pageStyle}>
            
            {deal ? (
                <>
                
                <h3 style={{fontFamily:"fantasy"}}>Bank Account Balance: {total_money}</h3>
                

                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => {
                          console.log("column: ",column)
                          return(
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        )})}
                      </TableRow>
                    </TableHead>
                    
                              
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        console.log("row: ",row)
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} >
                            {columns.map((column) => {
                              const value = row[column.id];
                              console.log("value: ",value)
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    
                  
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              
              
              
              </>
            ):(
                
                <Button onClick={handleDetail} style={{top:"100px",width:"400px"}} variant="outlined" color="primary" backgroundColor="transparent" >請看收入支出明細</Button>
                
                
                      
            )}

        </div>
        </>
                
    )
}
