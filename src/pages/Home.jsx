import Card from "../components/Card/Card";
import React from "react";
import AppContext from "../components/context";

function Home ({items, searchValue, onAddToFavorite, onCartAdded, setSearchValue, onChangeSearchInput, cartItems, isLoading}) {

    const {isItemAdded} = React.useContext(AppContext);

    const renderItems = () => { 

        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)].map((obj, index) => (
            <Card
            key={index+9}
            loading={isLoading}
            />
            
    )) : (filteredItems).map((obj, index) => (
            <Card
            key = {index}
            onFavorite = {(obj) => onAddToFavorite(obj)}
            onPlus = {(obj) => onCartAdded(obj)}
            added ={isItemAdded(obj && obj.articul)}
            loading={isLoading}
            {...obj}
            />
            
    )))
    }
    return (
        <div className="content p-40">

			<div className="d-flex align-center justify-between mb-40">
				<h1>{searchValue ? `Поиск по: "${searchValue}"` : `Все кроссовки`}</h1>
				<div className="search-block d-flex">
					<img src="/img/search.svg" alt="Search" />
					{searchValue && <img onClick = {() => setSearchValue('')}className="clear cu-p" src="/img/btn_remove.svg" alt="Remove" />}
					<input onChange={onChangeSearchInput} value = {searchValue} placeholder="Поиск..."/>
				</div>
			</div>
		
			<div className="d-flex flex-wrap">

				{
					renderItems()
				}
								
			</div>

		</div>
    )
}

export default Home;