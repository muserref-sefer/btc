import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import NotFound from './components/NotFound/NotFound'
import Home from './containers/Home/Home'
import NewsDetail from './containers/NewsDetail/NewsDetail'
import NewsSource from './containers/NewsSource/NewsSource'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/source/:slug" element={<NewsSource />} />
        <Route path="/detail/:source/:slug" element={<NewsDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
