import React, { Component } from 'react';
import './Footer.css';
import { Link } from '@material-ui/core';

class Footer extends Component {
	render() {
		return (
			<div>
				<footer className="page-footer font-small special-color-dark pt-4">
					{/* <!-- Footer Elements --> */}
					<div className="container">
						{/* <!-- Social buttons --> */}
						<ul className="list-unstyled list-inline text-center">
							<li className="list-inline-item">
								<Link className="btn-floating btn-tw mx-1" href="https://twitter.com/karmadrukpa22">
									<i className="fab fa-twitter black"> </i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link
									className="btn-floating btn-li mx-1"
									href="https://www.linkedin.com/in/karma-drukpa-009607129/"
								>
									<i className="fab fa-linkedin-in black"> </i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link className="btn-floating btn-dribbble mx-1" href="https://github.com/coderkarma">
									<i className="fab fa-github black" />
								</Link>
							</li>
						</ul>
					</div>
					<div className="footer-copyright text-center py-3">Built by Karma</div>
					<div className="footer-copyright text-center py-3">© 2019 Copyright</div>
				</footer>
			</div>
		);
	}
}
export default Footer;
