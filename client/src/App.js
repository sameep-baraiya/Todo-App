import './App.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Component
import Navbar from './component/layout/Navbar';

// Todo Component
import Todo from './component/todo/Todo';

// Auth Component
import Register from './component/auth/Register';
import Login from './component/auth/Login';

// Route Component
import TodoRoute from './component/route/TodoRoute';

// Page Componet
import About from './component/page/About';
import Home from './component/page/Home';
import NotFound from './component/page/NotFound';

// Context
import { AuthProvider } from './context/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register} />
          <TodoRoute exact path='/todos' component={Todo} />
          <Route exact path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
