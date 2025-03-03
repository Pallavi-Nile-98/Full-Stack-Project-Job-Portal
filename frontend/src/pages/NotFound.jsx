import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <section className="notfound">
      <div className="content">
        <h1>404 Not Found</h1>
        <p>Your Visited Page Not Found . You may go to home page.</p>
        <Link to={"/"} className="btn">Back to Home Page</Link>
      </div>

    </section>
  )
}

export default NotFound
