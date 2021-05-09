import logo from './logo.svg';
import './App.css';

// Import other components we made
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

// import modules to convigure route settings
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center" >
        React
      </h3>     
      
      <Navigation/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/department" component={Department} />
        <Route path="/employee" component={Employee} />        
      </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
