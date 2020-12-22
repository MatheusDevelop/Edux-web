import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './pages/feed';
import Header from './components/header';
import Admin from './pages/Admin';
import Instituicao from './pages/Instituicao';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Dash from './modules/Dash';
import Signup from './pages/Login/Signup';



function App() {
  const logged = useSelector(state => state.user.logged);
  const PrivateRoute = ({component: Component, ...rest}) => {
    return (
  
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            logged ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
  };
  return (
    <BrowserRouter>
        <Switch>
          <PrivateRoute path="/feed" component={Feed}/>
          <PrivateRoute path="/dash" component={Dash}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
