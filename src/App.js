import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="form_container">
        <form>
          <input 
            type="email" 
            placeholder="Email Address"
           />
          <input
            type="password" 
            placeholder="Password" 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
