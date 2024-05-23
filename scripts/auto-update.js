const https = require('node:https');
const fs = require('fs');
const unzipper = require('unzipper');
const xml2js = require('xml2js');

const URL =
	'https://www.unicode.org/Public/UCD/latest/ucdxml/ucd.all.grouped.zip';
const ZIP_FILE = 'ucd.all.grouped.zip';
const XML_FILE = 'ucd.all.grouped.xml';
const JSON_FILE = 'unicode-ranges.json';

function downloadFile(url, dest, cb) {
	const file = fs.createWriteStream(dest);
	https.get(url, (response) => {
		response.pipe(file);
		file.on('finish', () => {
			file.close(cb);
		});
	});
}

function unzipFile(zipFile, dest, cb) {
	fs.createReadStream(zipFile)
		.pipe(unzipper.Extract({path: dest})) // eslint-disable-line new-cap
		.on('close', cb);
}

function parseXML(xmlFile, cb) {
	fs.readFile(xmlFile, (err, data) => {
		if (err) {
			throw err;
		}
		xml2js.parseString(data, (err, result) => {
			if (err) {
				throw err;
			}
			cb(result);
		});
	});
}

function getBlockData(data) {
	const ranges = [];

	data.ucd.blocks[0].block.forEach((block) => {
		const _block = block.$;

		let name = _block.name;
		const hexRangeStart = _block['first-cp'];
		const hexRangeEnd = _block['last-cp'];

		// Override some of the entry names
		if (name.startsWith('Emoticons')) {
			name += ` (Emoji)`;
		}

		ranges.push({
			category: name,
			hexrange: [hexRangeStart, hexRangeEnd],
			range: [parseInt(hexRangeStart, 16), parseInt(hexRangeEnd, 16)]
		});
	});

	return ranges;
}

function getControlCharacterData(data) {
	const ranges = [];

	let lowestInt = Number.MAX_SAFE_INTEGER;
	let highestInt = Number.MIN_SAFE_INTEGER;

	let lowestHex;
	let highestHex;

	data.ucd.repertoire[0].group[0].char.forEach((block) => {
		const _block = block.$;

		const cp = _block.cp;
		const cpInt = parseInt(cp, 16);

		if (cpInt < lowestInt) {
			lowestInt = cpInt;
			lowestHex = cp;
		}

		if (cpInt > highestInt) {
			highestInt = cpInt;
			highestHex = cp;
		}
	});

	ranges.push({
		category: 'Control Character',
		hexrange: [lowestHex, highestHex],
		range: [lowestInt, highestInt]
	});

	return ranges;
}

function processUnicodeData(data) {
	const rangeBlocks = getBlockData(data);
	const controlCharacters = getControlCharacterData(data);

	return [...controlCharacters, ...rangeBlocks];
}

function writeJSON(data, jsonFile) {
	fs.writeFile(jsonFile, JSON.stringify(data, null, 2), (err) => {
		if (err) {
			throw err;
		}
		console.log(`Data has been written to ${jsonFile}`);
	});
}

// Main script execution
downloadFile(URL, ZIP_FILE, () => {
	console.log(`Downloaded ${ZIP_FILE}`);
	unzipFile(ZIP_FILE, '.', () => {
		console.log(`Unzipped ${ZIP_FILE}`);
		parseXML(XML_FILE, (data) => {
			console.log(`Parsed ${XML_FILE}`);
			const unicodeRanges = processUnicodeData(data);
			writeJSON(unicodeRanges, JSON_FILE);
		});
	});
});
