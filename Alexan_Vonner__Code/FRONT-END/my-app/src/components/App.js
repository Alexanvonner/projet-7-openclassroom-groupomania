
import{ BrowserRouter , Switch , Route } from "react-router-dom"

import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import forget_email from "../pages/Email_forget"
import Dashboard from "../pages/Dashboard";


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/reset-password" exact component={forget_email} />
                
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App