import { useState } from 'react';
import './App.css';
import { getTaskScores } from './services/date';


function App() {
	const [api, setApi] = useState("");
	const [sum, setSum] = useState(0);
	const [submitEnabled, setSubmitEnabled] = useState(false);

	const onSubmitClick = () => getTaskScores(api).then(setSum).catch(console.error);

	const onApiInputChanged = e => {
		setApi(e.target.value);
		setSubmitEnabled(e.target.value !== "");
	};

	return (
		<div className="App">
			<label htmlFor="">
				<input type="text" className="api_input" value={api} onChange={onApiInputChanged} placeholder={"write here your api key"} />
				{api.length === 0 ? (
					<a href='https://todoist.com/app/settings/integrations'>
						You can get your api key here
					</a>
				) : null}
				<button className="submit" type="submit" onClick={onSubmitClick} disabled={!submitEnabled}>Submit</button>
				<div className="sum">Total Score : {sum}</div>
			</label>
		</div >
	);
}

export default App;
