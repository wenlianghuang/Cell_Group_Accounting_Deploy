import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import amber from '@material-ui/core/colors/amber';
import Button from '@material-ui/core/Button';



const theme = createMuiTheme({
  spacing:8,
  palette:{
    button:{
      main: amber[500]
    }
  }
});
const NameandNumberTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
        fontSize: "1.0rem",
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
          
        },
      },
    },
})(TextField);
const PriceTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
      fontSize: '1em',
    },

    '& .MuiInput-underline:after':{
      corderBottomColor: 'black'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset':{
        borderColor: 'black'
      },
      '&:hover fieldset':{
        borderColor: 'blue'
      },
      '&.Mul-focused fieldset': {
        borderColor: 'blue'
      },
    }
  }
})(TextField)

const DealBuyButton = withStyles({
  root: {
    top: theme.spacing(6),
    left: theme.spacing(20),
    width: "50%",
    position: "relative",
    '&:hover':{
      backgroundColor: "red",
      color: "white"
    },
  }
})(Button)

const DealSellButton = withStyles({
  root: {
    top: theme.spacing(6),
    left: theme.spacing(20),
    width: "50%",
    position: "relative",
    '&:hover':{
      backgroundColor: "green",
      color: "white"
    },
  }
})(Button)

const ShowYourList = withStyles({
  root:{
    height:"3cm",
    width: "30%",
    position: "relative",
    '&:hover':{
      backgroundColor: '#3f51b5',
      color:"#ffb3d9",
    }
  }
})(Button)

/*const DealResult = withStyles({
  root:{
    width= '100%'
  },
  container:{
    maxHeight: 440,
  }
})*/
const useheaderStyles = makeStyles(() => ({
    button: {
      margin:theme.spacing(2),
      display: "block",
      width: "150px",
      top: "150px"
    }
}))
const useStyles = makeStyles((theme) => ({
    root: {
    '& MuiTextField-root':{
      display: 'flex',
      flexWrap: 'wrap',

      },
      height: "100vh",
      backgroundColor: "#ffffcc",
    },
    homepage: {
      //display: "flex",
      background: 'linear-gradient(to bottom, #CFF66E 0%, #8DF66E 100%)' ,
      height: "100vh",
      width:"100hw",
      
      
    },
    marginInFirstTwoItem: {
      margin: theme.spacing(3.5),
      width: "45%",
      left: "100px",
      position: "relative",
    },
    marginInPrice:{
      margin: theme.spacing(5),
      left: "-80px",
      width:"20%",
      position:"relative"
    },
    button:{
      top: theme.spacing(3),
      left: "100px",
      width: "30%",
      position: "relative",
      '&:hover':{
        backgroundColor: "green"
      }
    },
    buyradio:{
      left:"500px",
      position: "relative",
    },
    sellradio:{
      left: theme.spacing(95),
      position: "relative",

    }
    
}));




export {useStyles,NameandNumberTextField,PriceTextField,DealBuyButton,DealSellButton,ShowYourList,useheaderStyles};
