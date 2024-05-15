import { Link } from "react-router-dom"
import "./Header.scss"

function Header() {
  return (
    <div className="header" data-testid="header">
      <div className="container">
        <Link to="/"><img src="/assets/logo.svg" alt="logo" className="logo" /></Link>
      </div>
    </div>
  )
}

export default Header