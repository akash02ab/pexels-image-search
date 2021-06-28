import { createClient } from "pexels";
import { useEffect, useRef, useState } from "react";

const client = createClient("563492ad6f9170000100000113f525316273470d9df782d184f60f54");

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const inputRef = useRef();

	const fetchData = async () => {
		let response = await client.photos.curated();
		setData(response);
		setLoading(false);
	};

	const changehandler = async () => {
		if (inputRef.current.value === "") {
			fetchData();
			return;
		}

		const query = inputRef.current.value;
		let response = await client.photos.search({ query, per_page: 15 });
		setData(response);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container">
			<div className="head">
				<h1>Pexels Curated</h1>
				<input type="text" ref={inputRef} onChange={changehandler} />
			</div>
			{loading ? (
				<h1>Loading . . .</h1>
			) : (
				<div className="images">
					{data.photos.map((photo, index) => {
						return (
							<a className="image" href={photo.url} key={index}>
								<img src={photo.src.portrait} alt="pexels" />
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default App;
