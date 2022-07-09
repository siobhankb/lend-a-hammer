import React from 'react'
import {Link} from 'react-router-dom'
// tool photo
//https://www.pinterest.com/mariaphotocopy/
// build communities photo
// https://www.afsc.org/blogs/news-and-commentary/how-to-create-mutual-aid-network
// mutual aid emergency
// https:www.youtube.com/channel/UCgL-dCRLXw2RB9VkJ96brWA

 export default function Landing(props) {
  return (
    <>
      <div className="container">
        <div className="card" style="width: 18rem;">
          <img
            src="https://www.afsc.org/blogs/news-and-commentary/"
            className="card-img-top"
            alt="build communities text inside circle of holding hands "
          />
          <div className="card-body border-info bg-info-opacity-40">
            <h5 className="card-title">Lend-A-Hammer</h5>
            <p className="card-text">
              Let's build community togther by sharing our resources and skills!
              Sign up to lend tools you've got sitting around your garage... or
              to borrow from your neighbors!
            </p>
            <Link
              to="login"
              className="btn btn-info"
              flashMessage={props.flashMessage}
              logUserIn={props.logUserIn}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
