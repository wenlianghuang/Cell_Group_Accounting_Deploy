import { makeStyles } from '@material-ui/core/styles';
const columns = [
    { 
        id: 'item', 
        label: '項目',
        align: 'center', 
        minWidth: 150, },
    /*{ 
        id: 'stock_Name', 
        label: 'Expenditure/Income', 
        align: 'center',
        minWidth: 150 },*/
    /*{
      id: 'stock_Number',
      label: 'Type',
      align: 'center',
      minWidth: 70,
      //format: (value) => value.toLocaleString('en-US'),
    },*/
    {
      id: 'price',
      label: '價格',
      minWidth: 100,
      align: 'center',
      //format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'buyorsell',
      label: '收入or支出',
      minWidth: 70,
      align: 'center',
      //format: (value) => value.toFixed(2),
    },
    {
      id: 'selecteddate',
      label: '日期',
      minwidth: 200,
      align: 'center',
    }
]


const useDealStyles = makeStyles({
    root: {
      width: '100vw',
      top: '500px',
      
    },
    container: {
      maxHeight: 440,
      justifyContent: 'center',
    },
    paperbutton:{
      width: '30%',
      display: 'flex',
    },
    pageStyle:{
        height: '100vh',
        backgroundColor: '#ffb3d9',
    
    }
  });
export {columns,useDealStyles}