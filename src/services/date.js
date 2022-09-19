const date = new Date()
const sicneDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
console.log(sicneDate);

const year = sicneDate.getFullYear();
const month = sicneDate.getMonth();
const day = new Date().getDate();

const newDay = day + 1;
export const since = `${year}-${month + 1}-${day}T00:00:00`;

export const until = `${month === 11 &&
	day === 31 ? year + 1 : year}-${day === sicneDate.getDate() ? month + 2 : month + 1}-${newDay}T00:00:00`;
export const url = "https://api.todoist.com/sync/v9/completed/get_all";
console.log(`until`, until);
console.log("since", since);

const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
	try {
		const response = await fetch(url, { method, body, headers });

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`);
		}
		const data = await response.json();

		return data;
	} catch (e) {
		throw e;
	}
};


function getScoreFromTaskName(name) {
	const scoreText = name.replaceAll("\n", " ").match(/^.+\[(?<score>\d+)\]\s*$/)?.groups?.["score"];
	return scoreText ? parseInt(scoreText) : 0;
}

export function getTaskScores(api) {
	return request(`${url}?since=${since}&until=${until}`, "GET", null,
		{
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${api} `
		}).then(data => data.items.reduce((sum, { content }) => getScoreFromTaskName(content) + sum, 0))
}

// console.log("xcfbjnbjbncgjbn [234]".replaceAll("\n", " ").match(/^.+\[(?<score>\d+)\]\s*$/)?.groups?.["score"]);