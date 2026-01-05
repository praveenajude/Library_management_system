import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from "./Loginpage";
import Adminportal from "./components/admin/Adminportal";
import Userportal from "./components/user/Userportal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/adminportal/*" element={<Adminportal />} />
        <Route path="/userportal/*" element={<Userportal />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
