import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomersLoan from './components/CustomersLoan';
import LoanApplication from './components/LoanApplication';
import LoanRepayment from './components/LoanRepayments';
import Login from './components/Login';
import PendingLoans from './components/PendingLoans';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}></Route>
        <Route path='/signup' Component={Signup}></Route>
        <Route path='/apply' Component={LoanApplication}></Route>
        <Route path='/loans' Component={CustomersLoan}></Route>
        <Route path='/pendingLoans' Component={PendingLoans}></Route>
        <Route path='/transactions' Component={LoanRepayment}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
