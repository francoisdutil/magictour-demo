'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bookings = require('../../app/controllers/bookings.server.controller');

	// Bookings Routes
	app.route('/bookings')
		.get(bookings.list)
		.post(users.requiresLogin, bookings.create);

	app.route('/bookings/:bookingId')
		.get(bookings.read)
		.put(users.requiresLogin, bookings.hasAuthorization, bookings.update)
		.delete(users.requiresLogin, bookings.hasAuthorization, bookings.delete);

	// Finish by binding the Booking middleware
	app.param('bookingId', bookings.bookingByID);
};
