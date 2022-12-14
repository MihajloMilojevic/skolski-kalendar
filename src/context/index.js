import {createContext, useContext, useState, useEffect} from "react";

const StateContext = createContext();


export default function ContextProvider({children}) {

	const [datumi, setDatumi] = useState([]);
	const [dani, setDani] = useState([
		{checked: false, broj: 1},
		{checked: false, broj: 1},
		{checked: false, broj: 1},
		{checked: false, broj: 1},
		{checked: false, broj: 1},
		{checked: false, broj: 1},
		{checked: false, broj: 1},
	]);
	const [godina, setGodina] = useState((new Date().getFullYear()));

	useEffect(() => {
		const d = new Date();
		const m = d.getMonth() + 1;
		const g = d.getFullYear();
		if(m >= 9) setGodina(g);
		else setGodina(g - 1);

		const localDatumi = localStorage.getItem("datumi");
		if(localDatumi) setDatumi(JSON.parse(localDatumi));

		const localDani = localStorage.getItem("dani");
		if(localDani) setDani(JSON.parse(localDani));

	}, []);

	useEffect(() => {
		setDatumi(stari => {
			const noviDatumi = stari.sort((a, b) => new Date(a.godina, a.mesec, a.dan) - (new Date(b.godina, b.mesec, b.dan)))
			localStorage.setItem("datumi", JSON.stringify(noviDatumi));
			return noviDatumi;
		})
	}, [datumi])

	function dodajDatum({dan, mesec, godina}) {
		setDatumi(stari => [...stari, {dan, mesec, godina}]);
	}

	function izbaciDatum({dan, mesec, godina}) {
		const noviDatumi = datumi
							.filter(datum => !(datum.dan === dan && datum.mesec === mesec && datum.godina === godina))
		setDatumi(noviDatumi);
		localStorage.setItem("datumi", JSON.stringify(noviDatumi));
	}

	async function toggleDan(dan) {
		const noviDani = [...dani];
		noviDani[dan].checked = !noviDani[dan].checked;
		setDani(noviDani);
		localStorage.setItem("dani", JSON.stringify(noviDani));

		let date = new Date(godina, 8);
		const SeptembarFirstDay = mapDay(date.getDay());
		let firstDay;
		if(SeptembarFirstDay <= dan) firstDay = 1 + (dan - SeptembarFirstDay);
		else firstDay = (7 - SeptembarFirstDay) + 1 + dan;
		date = new Date(godina, 8, firstDay);
		const endDate = new Date(godina + 1, 6, 1);
		if(noviDani[dan].checked) {
			const datumiZaDodati = [];
			while (date < endDate) {
				datumiZaDodati.push({dan: date.getDate(), mesec: date.getMonth() + 1, godina: date.getFullYear()});
				date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
			}
			localStorage.setItem("datumi", JSON.stringify([...datumi, ...datumiZaDodati].sort((a, b) => new Date(a.godina, a.mesec, a.dan) - (new Date(b.godina, b.mesec, b.dan)))));
			setDatumi([...datumi, ...datumiZaDodati].sort((a, b) => new Date(a.godina, a.mesec, a.dan) - (new Date(b.godina, b.mesec, b.dan))));
		}
		else {
			const datumiZaIzbaciti = [];
			while (date < endDate) {
				datumiZaIzbaciti.push({dan: date.getDate(), mesec: date.getMonth() + 1, godina: date.getFullYear()});
				date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
			}
			const datumiNakonIzbacivanja = datumi
											.filter((datum) => datumiZaIzbaciti.findIndex(({dan, mesec, godina}) => datum.dan === dan && datum.mesec === mesec && datum.godina === godina) < 0)
											.sort((a, b) => new Date(a.godina, a.mesec, a.dan) - (new Date(b.godina, b.mesec, b.dan)))
			localStorage.setItem("datumi", JSON.stringify(datumiNakonIzbacivanja));
			setDatumi(datumiNakonIzbacivanja)
		}
	}

	function promeniBrojCasovaUDanu(dan, broj) {
		const noviDani = [...dani];
		noviDani[dan].broj = broj;
		setDani(noviDani);
	}

	function mapDay(defaultDay) {
		return (defaultDay + 7 - 1) % 7;
	}

	return (
		<StateContext.Provider
			value={{
				datumi, setDatumi, dodajDatum, izbaciDatum,
				dani, toggleDan, promeniBrojCasovaUDanu,
				mapDay,
				godina, setGodina
			}}
		>	
			{children}
		</StateContext.Provider>	
	)
}

export function useStateContext() {
	return useContext(StateContext)
}