import { createClient } from "pexels";
import { useEffect, useState } from "react";

const client = createClient("563492ad6f9170000100000113f525316273470d9df782d184f60f54");

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		let response = await client.photos.curated();
		setData(response);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container">
			<h1>Pexels Curated</h1>
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
