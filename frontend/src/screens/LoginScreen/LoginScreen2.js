import React from 'react'
import './LoginScreen2.css';
import pic1 from './img/log.svg';
import pic2 from './img/register.svg';
function LoginScreen2() {
  return (
        <div className="container2">
          <div className="forms-container2">
            <div className="signin-signup2">
              <form action="#" className="sign-in-form2">
                <h2 className="title2">Sign in</h2>
                <div className="input-field2">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" />
                </div>
                <div className="input-field2">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" />
                </div>
                <input type="submit" value="Login" className="btn2 solid2" />
                <p className="social-text2">Or Sign in with social platforms</p>
                <div className="social-media2">
                  <a href="#" className="social-icon2">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </form>
              <form action="#" className="sign-up-form2">
                <h2 className="title2">Sign up</h2>
                <div className="input-field2">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" />
                </div>
                <div className="input-field2">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="input-field2">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" />
                </div>
                <input type="submit" className="btn2" value="Sign up" />
                <p className="social-text2">Or Sign up with social platforms</p>
                <div className="social-media2">
                  <a href="#" className="social-icon2">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="#" className="social-icon2">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </form>
            </div>
          </div>
    
          <div className="panels-container2">
            <div className="panel2 left-panel2">
              <div className="content2">
                <h3>New here ?</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                  ex ratione. Aliquid!
                </p>
                <button className="btn2 transparent2" id="sign-up-btn">
                  Sign up
                </button>
              </div>
              <img src={pic1} className="image2" alt="" />
            </div>
            <div className="panel2 right-panel2">
              <div className="content2">
                <h3>One of us ?</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                  laboriosam ad deleniti.
                </p>
                <button className="btn2 transparent2" id="sign-in-btn">
                  Sign in
                </button>
              </div>
              <img src="img/register.svg" className="image2" alt="" />
            </div>
          </div>
        </div>
  )
}

export default LoginScreen2