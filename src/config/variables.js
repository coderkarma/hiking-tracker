export const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'http://hiking-tracker-backend.herokuapp.com';
