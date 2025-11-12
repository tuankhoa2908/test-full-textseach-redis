const cleanWordSearching = ({ text }) => {
	if (!text || text.trim() === "") {
		return "";
	}

	const words = text
		.replaceAll(/[^a-zA-Z0-9 ]/g, "")
		.trim()
		.toLowerCase()
		.split(" ")
		.filter(Boolean);

	if (words.length === 0) {
		return "*";
	}

	const fuzzyWords = words.map((word) => `%${word}%`);

	const prefixWord = words[words.length - 1] + "*";

	const queryString = [...fuzzyWords, prefixWord].join(" | ");

	return queryString;
};

module.exports = {
	cleanWordSearching,
};
