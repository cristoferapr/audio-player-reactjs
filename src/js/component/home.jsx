import React, {useState, useEffect} from "react";
import { Navbar } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HiPlayPause } from "react-icons/hi2";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faCaretRight, faCaretLeft)

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";
let currentIdx = 0;

//create your first component
const Home = () => {
	const url = 'https://assets.breatheco.de/apis/sound/songs'
	const [songs, setSongs] = useState()
	const fetchApi = async () => {
		const response = await fetch(url)
		console.log(response.status)
		const responseJSON = await response.json()
		setSongs(responseJSON)
		console.log(responseJSON)
	}
	useEffect (() => {
		fetchApi()
	}, [])

	const audurl = 'https://assets.breatheco.de/apis/sound/'

	let audio = new Audio()

  	 const start = async () => {
    	await audio.play()
  	}

	  const stop = async () => {
    	await audio.pause()
  	}

	async function handleInput(e) {
		await stop()
		audio = new Audio(audurl+songs[e.target.value].url)
		await start()
	}

	const handlePlayPause = () =>{
		{audio.paused ? start() : stop()}
	}

	const handleNext = () =>{
			stop()
			if (currentIdx == 21) currentIdx = -1;
			audio = new Audio(audurl+songs[currentIdx+1].url)
			currentIdx = currentIdx + 1
			start()
	}

	const handlePrev = () =>{
		stop()
		if (currentIdx == 0) currentIdx = 22;
		audio = new Audio(audurl+songs[currentIdx-1].url)
		currentIdx = currentIdx - 1
		start()
	}

	return (
		<div className="text-center bg-dark h-100">
			<ul className="bg-dark">
				{!songs ? 'Cargando...' :
					songs.map((song, index) => {
						return <li key={song.url}>
							<button value={index} onClick={(e) => handleInput(e, 'value')} className="songbtn w-100 text-start bg-dark"><span className="text-secondary ms-2">{index + 1 + '.    '}</span><span className="ps-5 text-white">{song.name} -</span></button>
						</li>;
					})}
			</ul>
			<Navbar sticky="bottom" className="justify-content-center dark">
				<button className="controls me-3 justify-content-md-center" onClick={handlePrev}><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>
				<button className="controls justify-content-md-center" onClick={handlePlayPause}><HiPlayPause className="mb-1"/></button>
				<button className="controls ms-3 justify-content-md-center" onClick={handleNext}><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
			</Navbar>

		</div>
	);
};

export default Home;
