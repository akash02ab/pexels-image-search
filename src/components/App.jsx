import { createClient } from "pexels";
import { useEffect, useRef, useState } from "react";

const credential = "563492ad6f9170000100000113f525316273470d9df782d184f60f54";
const client = createClient(credential);

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

	const prev = async (url) => {
		if (url) {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: credential,
				},
			});
			const data = await response.json();
			setData(data);
		}
	};

	const next = async (url) => {
		if (url) {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: credential,
				},
			});
			console.log(response);
			const data = await response.json();
			setData(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container">
			<div className="header">
				<h1>Pexels Curated</h1>
				<input type="text" ref={inputRef} onChange={changehandler} />
			</div>

			{loading ? (
				<h1>Loading . . .</h1>
			) : (
				<div className="images">
					{data.photos ? (
						data.photos.map((photo, index) => {
							return (
								<a className="image" href={photo.url} key={index}>
									<img src={photo.src.portrait} alt="pexels" />
								</a>
							);
						})
					) : (
						<h1>No Result Found.</h1>
					)}
				</div>
			)}

			<div className="footer">
				<p onClick={() => prev(data.prev_page)} className={data.prev_page ? "" : "disable"}>
					&#8612;
				</p>
				<p onClick={() => next(data.next_page)} className={data.next_page ? "" : "disable"}>
					&#8614;
				</p>
			</div>
		</div>
	);
}

export default App;
