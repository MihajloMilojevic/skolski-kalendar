import React from 'react'
import {useStateContext} from "../../context";

const daniNazivi = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak"];

function DaniCheck() {

	const {toggleDan, dani} = useStateContext();

	return (
		<div>
			{
				daniNazivi.map((naziv, index) => (
					<div key={index}>
						<input type="checkbox" checked={dani[index]} onChange={() =>toggleDan(index)} id={naziv} />
						<label htmlFor={naziv}>
							{naziv}
						</label>
					</div>
				))
			}
		</div>
	)
}

export default DaniCheck