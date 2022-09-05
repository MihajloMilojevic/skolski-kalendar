import React from 'react'
import {useStateContext} from "../../context";

const daniNazivi = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak"];

function DaniCheck() {

	const {toggleDan, dani, promeniBrojCasovaUDanu} = useStateContext();

	return (
		<div>
			{
				daniNazivi.map((naziv, index) => (
					<div key={index}>
						<div>
							<input type="checkbox" checked={dani[index].checked} onChange={() =>toggleDan(index)} id={naziv} />
							<label htmlFor={naziv}>
								{naziv}
							</label>
						</div>
						<div>
							<label htmlFor={naziv + "-casovi"}>Broj časova: </label>
							<input type="number" min={1} max={15} value={dani[index].broj} onChange={e => promeniBrojCasovaUDanu(index, e.target.value)} id={naziv + "-casovi"} />
						</div>
					</div>
				))
			}
		</div>
	)
}

export default DaniCheck