var TextCell = require('../lib/drawTable.js')

describe ('TextCell constructor', function () {
	it('creates a TextCell object', function () {
		var text = "hello\nworld";
		var textCell = new TextCell(text);
		expect(typeof textCell).toBe('object');
	});
});
