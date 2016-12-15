import test from 'ava';
import ranges from './';

test('is an array', t => {
	t.true(Array.isArray(ranges));
});

test('all values have category, hexrange, range', t => {
	t.plan(ranges.length * 3);

	ranges.forEach(range => {
		t.is(typeof range.category, 'string');
		t.true(Array.isArray(range.hexrange));
		t.true(Array.isArray(range.range));
	});
});

test('all hexrange values have proper formatting', t => {
	t.plan(ranges.length * 5);

	ranges.forEach(range => {
		t.is(range.hexrange.length, 2);
		t.is(typeof range.hexrange[0], 'string');
		t.is(typeof range.hexrange[1], 'string');
		t.true(range.hexrange[0].length >= 4 && range.hexrange[0].length <= 5);
		t.true(range.hexrange[1].length >= 4 && range.hexrange[0].length <= 5);
	});
});

test('all ranges values have proper formatting', t => {
	t.plan(ranges.length * 5);

	ranges.forEach(range => {
		t.is(range.range.length, 2);
		t.is(typeof range.range[0], 'number');
		t.is(typeof range.range[1], 'number');
		t.true(range.range[0] === Math.abs(parseInt(range.range[0], 10)));
		t.true(range.range[1] === Math.abs(parseInt(range.range[1], 10)));
	});
});
