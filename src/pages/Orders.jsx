import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import Card from "../components/Card/Card";
function Orders () {


	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			
			try {
				setIsLoading(true);
				const {data} = await axios.get('https://63371b2a132b46ee0bdd4c1b.mockapi.io/orders');
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
			}
			catch(exeption) {
				alert('Ой что-то пошло не так!')
			}
			setIsLoading(false)
			console.log(orders);
		})()
	}, [])

    return (
		<>
		{
			orders.length > 0 ? (
				<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Мои заказы</h1>
				</div>
				<div className="d-flex flex-wrap">
				{
						(isLoading ? [...Array(8)] : orders)
						.map((obj, key) => {
							return (
								<Card
								key = {key}
								loading={isLoading}
								{...obj}
								/>
							)
						})
					}	
				</div>
			</div>
			) : (
				<div className="block_empty">
					<img src="/img/order_empty.png" alt="order_empty" />
					<h3>У вас нет заказов</h3>
					<p>Ещё не выбрали?
					Оформите хотя бы один заказ.</p>
					<Link to="/">
						<button className="greenButton">
							<img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
						</button>
					</Link>
				</div>
			)
		}
		</>
	)
		
}

export default Orders;