const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({ message: 'No token provided.' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Token is not valid.' });
	}
};
