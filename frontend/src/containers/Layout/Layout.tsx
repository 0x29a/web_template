import React from "react";
import Col from "react-bootstrap/Col";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Layout = () => (
    <Col lg={"8"} className="mx-auto p-3 py-md-5">
        <Header />
        <main>
            <h1>Get started with WebTemplate</h1>
            <p className="fs-5 col-md-8">Quickly and easily get started with Bootstrap's compiled, production-ready files with this barebones example featuring some basic HTML and helpful links. Download all our examples to get started.</p>

            <div className="mb-5">
                <a href="/docs/5.1/examples/" className="btn btn-white btn-lg border-dark px-4">Example button</a>
            </div>

            <hr className="col-3 col-md-2 mb-5"></hr>

            <div className="row g-5">
                <div className="col-md-6">
                    <h2>Starter projects</h2>
                    <p>Ready to beyond the starter webtemplate? Check out these open source projects that you can quickly duplicate to a new GitHub repository.</p>
                    <ul className="icon-list">
                        <li><a href="https://github.com/twbs/bootstrap-npm-starter">Bootstrap npm starter</a></li>
                        <li className="text-muted">Bootstrap Parcel starter (coming soon!)</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <h2>Guides</h2>
                    <p>Read more detailed instructions and documentation on using or contributing to Bootstrap.</p>
                    <ul className="icon-list">
                        <li><a href="/docs/5.1/getting-started/introduction/">Bootstrap quick start guide</a></li>
                        <li><a href="/docs/5.1/getting-started/webpack/">Bootstrap Webpack guide</a></li>
                        <li><a href="/docs/5.1/getting-started/parcel/">Bootstrap Parcel guide</a></li>
                        <li><a href="/docs/5.1/getting-started/contribute/">Contributing to Bootstrap</a></li>
                    </ul>
                </div>
            </div>
        </main>
        <Footer />
    </Col>
);

export default Layout;
