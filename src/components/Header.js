import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../hooks/useCart";

const Header = ({onClickCart}) => {

	const {totalPrice} = useCart();

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} src="img/logo.png" alt="Logotype"/>
					<div className="headerInfo">
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li className="mr-30 cu-p" onClick={onClickCart}>
					<img  width={18} height={18} src="img/Cart.svg" alt="Cart"/>
					<span>{totalPrice} руб</span>
				</li>
				<li className="mr-20 cu-p">
					<Link to = "/favorites">
						<img width={18} height={18} src="img/Heart.svg" alt="Heart"/>
					</Link>
				</li>
				<li>
					<Link to="/orders">
						 <img width={18} height={18} src="img/Union.svg" alt="Union"/>
					</Link>
				</li>
				
			</ul>
	</header>
	)
}

export default Header;