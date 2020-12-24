export const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: 'https://hiking-tracker-backend.herokuapp.com';
