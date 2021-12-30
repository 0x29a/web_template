import React from 'react';

import Logo from './logo.svg';

const Header = () => (
  <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <img src={Logo} width="40" height="32" alt="Logo" />
      <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
    </a>

    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><a href="/123" className="nav-link px-2 link-secondary">Home</a></li>
      <li><a href="/123" className="nav-link px-2 link-dark">Features</a></li>
      <li><a href="/123" className="nav-link px-2 link-dark">Pricing</a></li>
      <li><a href="/123" className="nav-link px-2 link-dark">FAQs</a></li>
      <li><a href="/123" className="nav-link px-2 link-dark">About</a></li>
    </ul>

    <div className="col-md-3 text-end">
      <button type="button" className="btn btn-outline-dark me-2">Login</button>
      <button type="button" className="btn btn-dark">Sign-up</button>
    </div>
  </header>
)

export default Header;
