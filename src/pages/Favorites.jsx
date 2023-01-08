import React from "react";
import AppContext from "../components/context";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
function Favorites ({onAddToFavorite}) {

	const {favorites} = React.useContext(AppContext); 
    return (
        <div className="content p-40">
			{
				favorites.length > 0 ? (
					<>
					<div className="d-flex align-center justify-between mb-40">
						<h1>Мои закладки</h1>
					</div>
					<div className="d-flex flex-wrap">
					{
							favorites
							.map((obj, key) => {
								return (
									<Card
									key = {key}
									favorited={true}
									onFavorite={onAddToFavorite}
									{...obj}
									/>
								)
							})
						}	
					</div>
				</>
				) : (
					<div className="block_empty">
					<img src="/img/favorites_empty.png" alt="favorites_empty" />
					<h3>Закладок нет :(</h3>
					<p>Вы ничего не добавляли в закладки</p>
					<Link to="/">
						<button className="greenButton">
							<img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
						</button>
					</Link>
				</div>
				)
			}
		</div>
    )
}

export default Favorites;