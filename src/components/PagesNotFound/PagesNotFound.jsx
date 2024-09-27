import { Link, useRouteError } from "react-router-dom";
import NotFoundImage from "../../assets/monster.png";
import "./pages-not-found.scss";

const PagesNotFound = () => {

  const routeError = useRouteError();  
  
  if (routeError?.status === 404) {
    return (
      <div className='container'>
          <div className='error-page'>
            <img className="error-page__image" src={NotFoundImage} alt="Monster" />
            <div className="error-page__content">
              <h1 className="error-page__title">OOPS! PAGES {routeError?.statusText}.
              </h1>
              <p className="error-page__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, esse voluptate, sint asperiores architecto 
                ullam culpa et corporis quasi, praesentium quos tempore ad debitis dolore excepturi aspernatur ipsa qui consequatur?
              </p>
              <Link to="/" className="error-page__btn">
                Back to Home
              </Link>
            </div>
          </div>
      </div>
    )
  } else {
    <div className='container'>
          <div className='error-page'>
            <img className="error-page__image" src={NotFoundImage} alt="Monster" />
            <div className="error-page__content">
              <h1 className="error-page__title">OOPS! SOMETHING WENT WRONG!.
              </h1>
              <p className="error-page__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, esse voluptate, sint asperiores architecto 
                ullam culpa et corporis quasi, praesentium quos tempore ad debitis dolore excepturi aspernatur ipsa qui consequatur?
              </p>
              <Link to="/" className="error-page__btn">
                Back to Home
              </Link>
            </div>
          </div>
      </div>
  }
}

export default PagesNotFound