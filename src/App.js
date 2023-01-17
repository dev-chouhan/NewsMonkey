import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// export default class App extends Component {
  const App = () => {
  const pageSize = 6;
  const pageCountry = 'in';
  const apiKeyOriginal = '4177873bda764b678adcea6b0603159b';
  //* const apiKeyOriginal = process.env.REACT_APP_NEWS_API; //? doesn't work becouse the request is not from local host it's at some different address.
  // state = {progress: 0};
  // setProgress = (progress)=>{
  //   setState({progress: progress})
  // };
  
  const [progress, setProgress] = useState(0);

  // render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="general" pageSize={pageSize} country={pageCountry} category='general' />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="business" pageSize={pageSize} country={pageCountry} category='business' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="entertainment" pageSize={pageSize} country={pageCountry} category='entertainment' />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="health" pageSize={pageSize} country={pageCountry} category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="science" pageSize={pageSize} country={pageCountry} category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="sports" pageSize={pageSize} country={pageCountry} category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKeyOriginal} key="technology" pageSize={pageSize} country={pageCountry} category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  // }
}

export default App;