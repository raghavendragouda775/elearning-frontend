import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          By ❤️ <a href="">Raghu</a>
        </p>
        <div className="social-links">
          <a href="https://facebook.com">
            <AiFillFacebook />
          </a>
          <a href="https://twitter.com">
            <AiFillTwitterSquare />
          </a>
          <a href="https://instagram.com">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
