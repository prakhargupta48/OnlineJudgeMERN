import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import SLoginSignup from './SLoginSignup';
import HeaderLogin from './HeaderLogin';
import SubmissionHistory from './SubmissionHistory'
import Home from './Home';
import ProblemsList from './ProblemsList';
import Contribute from './Contribute';
import ProblemDetails from './ProblemDetails';
import Myaccount from './Myaccount';
import AIReviewPage from './AIReviewPage';
import EditProblem from './EditProblem';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SLoginSignup/>} />
        <Route path="/signup" element={<LoginSignup/>} />
        <Route path="/myaccount" element={<Myaccount/>} />
        {/* getting problems page */}
        <Route path='/problems' element={<ProblemsList/>} />
        {/* posting problems page */}
        <Route path="/problems_post" element={<Contribute/>} />
        <Route path="/submission_history/:id" element={<SubmissionHistory/>} />

        {/* getting particular problem */}
        <Route path="/problems/:id" element={<ProblemDetails/>} />
        
        {/* Admin routes */}
        <Route path="/admin/problems/:id/edit" element={<EditProblem/>} />
        
        {/* AI Review page */}
        <Route path="/ai-review" element={<AIReviewPage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
