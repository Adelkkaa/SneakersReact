import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Route, Routes } from "react-router-dom";
import AppContext from "./components/context";
import Orders from "./pages/Orders";



function App() {

	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [cart, setCart] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);


	useEffect( () => {
		async function fetchData () {

			try {

				const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([axios.get('https://63371b2a132b46ee0bdd4c1b.mockapi.io/cart'), 
				axios.get('https://63371b2a132b46ee0bdd4c1b.mockapi.io/favorites'), 
				axios.get('https://63371b2a132b46ee0bdd4c1b.mockapi.io/items') ]);

				setCartItems(cartResponse.data);
				setFavorites(favoriteResponse.data);
				setItems(itemsResponse.data);
				setIsLoading(false);
			}
			catch(exeption) {
				alert("Ошибка при запросе данных")
			}
		}
		fetchData();
	}, [])



	const onCartAdded = (obj) => {
		try {
			const result = cartItems.find(item => item.articul === obj.articul);
			if (result) {
				axios.delete(`https://63371b2a132b46ee0bdd4c1b.mockapi.io/cart/${result.id}`)
				setCartItems((prev) => prev.filter(item => Number(item.articul) !== Number(obj.articul)));
			}
			else {
				axios.post('https://63371b2a132b46ee0bdd4c1b.mockapi.io/cart', obj)
				.then(res => setCartItems(prev => [...prev, res.data]))
			}
		}
		catch(exeption) {
			alert("Ошибка при добавлении в корзину!")
		}
		
		
		
	}

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://63371b2a132b46ee0bdd4c1b.mockapi.io/cart/${id}`)
			setCartItems(prev => prev.filter(item => item.id !== id))
		}
		catch(exeption) {
			alert("Ошибка при удалении из корзины!")
		}
		
	}

	const onAddToFavorite = (obj) => {
		const result = favorites.find(item => item.articul === obj.articul)
		try {
			if (result) {
				axios.delete(`https://63371b2a132b46ee0bdd4c1b.mockapi.io/favorites/${result.id}`)
				setFavorites(prev => prev.filter(item => item.articul !== obj.articul))
			}
			else {
				axios.post('https://63371b2a132b46ee0bdd4c1b.mockapi.io/favorites', obj)
				.then(res => setFavorites(prev => [...prev, res.data]))
			}
		}
		catch (error) {
			alert('Не удалось добавить в закладки');
		}
		
		
	}

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	}

	const isItemAdded = (articul) => {
		return cartItems.some(obj => obj.articul === articul);
	}



  return (
   <AppContext.Provider value = {{items, cartItems, favorites, isItemAdded, setCart, setCartItems, onCartAdded, onAddToFavorite}}>
	<div className="wrapper clear">

		<Drawer 
		items={cartItems} 
		onClickCart = {() => setCart(false)} 
		onRemove={onRemoveItem}
		opened={cart}/>
		<Header onClickCart = {() => setCart(true)}/>
		<Routes>
			<Route path="/" element={<Home 
			items={items} 
			cartItems={cartItems}
			searchValue={searchValue} 
			onAddToFavorite={onAddToFavorite} 
			onCartAdded={onCartAdded} 
			setSearchValue={setSearchValue} 
			onChangeSearchInput={onChangeSearchInput}
			isLoading={isLoading}
			/>}/>
			<Route path="/favorites" element={<Favorites onAddToFavorite={onAddToFavorite}/>}/>
			<Route path="/orders" element={<Orders/>}/>
		</Routes>
</div>
   </AppContext.Provider>
  );
}

export default App;
