import './App.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Component
import Navbar from './component/layout/Navbar';

// Page Componet
import About from './component/page/About';
import Home from './component/page/Home';
import NotFound from './component/page/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
