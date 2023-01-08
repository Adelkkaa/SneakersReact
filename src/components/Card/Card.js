import styles from './Card.module.scss';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import React from 'react';
import AppContext from '../context';

const Card = ({id, onPlus, onFavorite, name, price, img, articul, favorited = false, loading = false}) => {


	const {isItemAdded} = React.useContext(AppContext);


	const [isFavorite, setIsFavorite] = useState(favorited);

	const onClickPlus =  () => {
		 onPlus({id, name, price, img, articul});

	}

	const onClickFavorite =  () => {
		setIsFavorite((isFavorite) => isFavorite = !isFavorite);
		onFavorite({id, name, price, img, articul});

   }
    return (
		
        <div className={styles.card}>
			{loading ?  <ContentLoader 
						speed={2}
						width={150}
						height={220}
						viewBox="0 0 150 220"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb">
						<rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
						<rect x="0" y="102" rx="5" ry="5" width="150" height="15" /> 
						<rect x="0" y="129" rx="5" ry="5" width="100" height="15" /> 
						<rect x="0" y="165" rx="5" ry="5" width="80" height="25" /> 
						<rect x="118" y="159" rx="10" ry="10" width="32" height="32" />
					</ContentLoader> : 
			<> 
				{onFavorite && (
					<div className={styles.favorite}>
						<img 
						onClick={onClickFavorite}
						src={`/img/heart_${isFavorite ? 'liked' : 'unliked'}.svg`} alt="Unliked" />
				</div>
				)}
				<img width={133} height={112} src={img} alt="" />
				<h5>{name}</h5>
				<div className="d-flex justify-between align-center">
					<div className="d-flex flex-column">
						<span >Цена:</span>
						<b>{`${price} руб.`}</b>
					</div>
						{ onPlus && (
						<img
						className={styles.button} 
						width={11} 
						height={11} 
						onClick={onClickPlus} 
						src={`/img/btn_${isItemAdded(articul) ? 'checked' : 'plus'}.svg`} 
						alt="Plus"
						/>) }
				</div>
			</>}
				
		</div>
    )
}

export default Card;