import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";
import HomePage from '../components/homepage';
import CreateUser from '../components/create_user.js';
import ChangePassword from '../components/change_password.js';
import DeleteUser from '../components/delete_user.js';
import LoginUser from '../components/login_user.js';
import Stock_Platform from '../components/stock_platform';
import Deal from '../components/deal';
import Food from '../components/food';
import Clothing from '../components/clothing';
import Accommodation from '../components/accommodataion';
import Transport from '../components/transport';
import Others from '../components/others';
import AfterLoginPage from '../components/after_login_page'
import DeleteContent from '../components/delete_content';
import '../components/use-auth';
import { ProvideAuth,HeaderwithButton} from '../components/use-auth';
function Home(){
    return (
      <>
      <ProvideAuth>
          <div className="App">
            <header>
            <HeaderwithButton/>
            </header>
            
            <div>
              
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path='/create-user' component={CreateUser}/>
                <Route path='/login' component={LoginUser}/>
                <Route path='/change-password' component={ChangePassword}/>
                <Route path='/delete-account' component={DeleteUser}/>
                
              </Switch>
            </div>
            <div>
            <Switch>
                <Route exact path="/after_login_page" component={AfterLoginPage}/>
                <Route path="/after_login_page/stock_platform" component={Stock_Platform}/>
                <Route path="/after_login_page/Deal" component={Deal}/>
                <Route path="/after_login_page/delete_content" component={DeleteContent}/>
                <Route path="/after_login_page/stock_platform/Expenses/Food" component={Food}/>
                <Route path="/after_login_page/stock_platform/Expenses/Clothing" component={Clothing}/>
                <Route path="/after_login_page/stock_platform/Expenses/Accommodation" component={Accommodation}/>
                <Route path="/after_login_page/stock_platform/Expenses/Transport" component={Transport}/>
                <Route path="/after_login_page/stock_platform/Expenses/Others" component={Others}/>
                
            </Switch>
            </div>
            
          </div>
          
    </ProvideAuth>
    
    </>
    );
}

export default Home;