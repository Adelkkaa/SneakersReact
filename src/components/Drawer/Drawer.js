import Info from "../info";
import React from "react";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onClickCart, onRemove, items = [], opened}) => {

	const {cartItems, setCartItems, totalPrice} = useCart()

	const [orderId, setOrderId] = React.useState(null); 
	const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.post("https://63371b2a132b46ee0bdd4c1b.mockapi.io/orders", {
				items: cartItems
			});
			setOrderId(data.id);
			setIsOrderCompleted(true);
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://63371b2a132b46ee0bdd4c1b.mockapi.io/cart/' + item.id);
				await delay(1000);
			  }
			setCartItems([]);
			
		}
		catch (exeption) {
			throw new Error("Не удалось оформить заказ");
		}
		setIsLoading(false);
	}
	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className="mb-30 d-flex justify-between">Корзина
				<img onClick={onClickCart} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Remove" />
				</h2>
				{
					items.length > 0 ? (
						<>
						<div className={styles.items}>
						{
							items.map(obj => (
							<div key ={obj.id} className="cartItem d-flex align-center mb-20">
								<div 
								style={{backgroundImage: `url(${obj.img})`}}
								className="cartItemImg"></div>
								<div className="mr-20 flex">
									<p className="mb-5">{obj.name}</p>
									<b>{obj.price} руб.</b>
								</div>
								<img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn_remove.svg" alt="Remove" />
							</div>
							))
						}
					</div>
					<div className="cartTotalBlock"><ul>
						<li>
							<span>Итого</span>
							<div></div>
							<b>{totalPrice} руб. </b>
						</li>
						<li>
							<span>Налог 5%: </span>
							<div></div>
							<b>{Math.floor(totalPrice * 0.05)} руб. </b>
						</li>
					</ul>
						<button onClick={onClickOrder} className="greenButton" disabled={isLoading}>Оформить заказ
							<img src="/img/arrow.svg" alt="Arrow" />
						</button>
					</div>
						</>
						
					) : (
						<Info
						name={isOrderCompleted ? "Заказ оформлен!" : 'Корзина пустая'} 
						description={isOrderCompleted  ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
						image={isOrderCompleted ? "/img/completed_order.jpg" : "/img/cart_empty.jpg"}/>
					)
				}
				
			</div>
		</div>
	)
}

export default Drawer;