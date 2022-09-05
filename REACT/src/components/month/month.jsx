/* eslint-disable no-mixed-operators */
import React from 'react'
import { useStateContext } from '../../context';

import "./month.css";

const dani = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const meseci = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

function Day({day, month, year}) {

	const {dodajDatum, izbaciDatum, datumi} = useStateContext();
	const selected = datumi.findIndex(datum => (datum.dan === day && datum.mesec === month && datum.godina === year)) >= 0;
	function handleClick() {
		if(!day) return;
		if(selected) izbaciDatum({dan: day, mesec: month, godina: year});
		else dodajDatum({dan: day, mesec: month, godina: year});
	}

	return (
		<td 
			className={selected ? "selected" : ""}
			onClick={handleClick}
			style={{
				...(day ? {cursor: "pointer"} : {})
			}}
		>
			{day}
		</td>
	)
}

function Week({days, month, year}) {
	return (
		<tr>
			{days.map((day, index) => (
				<Day key={index} day={day} month={month} year={year} />
			))}
		</tr>
	)
}

function leapYear(year) {
	return ((0 === year % 4) && (0 !== year % 100) || (0 === year % 400))
}

function generateMonth(month, year, mapDay) {
	let daysInMonth;
	switch (month) {
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			daysInMonth = 31;
			break;
		case 4: case 6: case 9: case 11:
			daysInMonth = 30;
			break;
		case 2:
			daysInMonth = 28 + (leapYear(year) ? 1 : 0);
			break;
		default:
			throw new Error("Pogrešan mesec");
	}
	const monthDays = [];
	let currentDate = 1;
	const startDay = mapDay((new Date(year, month - 1)).getDay());
	while (currentDate <= daysInMonth) {
		const week = [];
		for(let i = 0; i < 7; i++) {
			if((currentDate === 1 && i < startDay) || currentDate > daysInMonth) week.push(null);
			else week.push(currentDate++);
		}
		monthDays.push(week);
	}
	return monthDays;
}

function Month({month, year}) {
	const {mapDay} = useStateContext();
	const table = generateMonth(month, year, mapDay);
	return (
		<div className="mesec">
			<h6>{meseci[month - 1]} {year}.</h6>
			<table>
			<thead>
				<tr>
					{dani.map((dan, index) => (<th key={index}>{dan}</th>))}
				</tr>
			</thead>
			<tbody>
				{
					table.map((week, index) => (<Week key={index} days={week} month={month} year={year} />))
				}
			</tbody>
		</table>
		</div>
	)
}

export default Month