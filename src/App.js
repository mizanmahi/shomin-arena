import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
   return (
      <div className='App'>
         <Router>
            <Switch>
               <Route exact path='/home'>
                  <Home />
               </Route>
               <Route exact path='/'>
                  <Home />
               </Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
