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
								<Link className="btn-floating btn-tw mx-1">
									<i className="fab fa-twitter"> </i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link className="btn-floating btn-li mx-1">
									<i className="fab fa-linkedin-in"> </i>
								</Link>
							</li>
							<li className="list-inline-item">
								<Link className="btn-floating btn-dribbble mx-1">
									<i className="fab fa-github" />
								</Link>
							</li>
						</ul>
						{/* <!-- Social buttons --> */}
					</div>
					{/* <!-- Footer Elements --> */}

					{/* <!-- Copyright --> */}
					<div className="footer-copyright text-center py-3">© 2019 Copyright</div>
				</footer>
				{/* <!-- Footer --> */}
			</div>
		);
	}
}
export default Footer;
