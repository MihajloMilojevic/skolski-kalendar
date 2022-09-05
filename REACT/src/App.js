
import { DaniCheck, Month } from "./components";

import "./App.css";
import { useStateContext } from "./context";

const prvoPolugodiste = [9, 10, 11, 12];
const drugoPolugodiste = [1, 2, 3, 4, 5, 6];

function App() {
	
	const {godina, datumi} = useStateContext();

	return (
		<div className="app">
			<h3>Broj časova: {datumi.length}</h3>
			<DaniCheck />
			<div className="kalendar">
				<div>
					{
						prvoPolugodiste.map((mesec, key) => (
							<Month key={key} month={mesec} year={godina} />
						))
					}
				</div>
				<div>
					{
						drugoPolugodiste.map((mesec, key) => (
							<Month key={key} month={mesec} year={godina + 1} />
						))
					}
				</div>
			</div>
			<ul>
				{datumi.map(({dan, mesec, godina}, index) => (
					<li key={index}>
						{index + 1}. - {dan}.{mesec}.{godina}.
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
