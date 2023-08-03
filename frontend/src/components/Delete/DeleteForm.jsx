import react, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './../Header/Header';
import imageSrc from './../../Assets/Images/error.png';
import { gql, useQuery, useMutation } from '@apollo/client';
let DeleteForm = () => {
	let Foods = gql`
		query Food($foodId: ID!) {
			food(foodId: $foodId) {
				data {
					_id
					category_id
					food_image
					food_name
					food_price
				}
				message
				status
			}
		}
	`;

	let DELETE_FOOD = gql`
		mutation DeleteFood($deleteFoodId: ID!, $categoryId: ID!) {
			deleteFood(id: $deleteFoodId, category_id: $categoryId) {
				message
				status
			}
		}
	`;
	let { id } = useParams();
	let [er, setEr] = useState(false);

	let [deleteFood, { load, err, info }] = useMutation(DELETE_FOOD);
	let token = localStorage.getItem('token');

	const { loading, error, data } = useQuery(Foods, {
		variables: { foodId: id },
		context: {
			headers: {
				authorization: `${token}`,
			},
		},
	});
	if (loading) return 'Loading...';
	if (error) {
		setEr(true);
	}
	let handleClick = (foodId) => {
		deleteFood({
			variables: {
				deleteFoodId: foodId,
				categoryId: id,
			},
		});
	};

	return (
		<div className='row'>
			{data.food.data?.length > 0 ? (
				data.food.data.map((food) => (
					<form
						className='col-md-4 m-4 text-decoration-none'
						key={food._id}>
						<div
							className='card mb-4'
							style={{
								height: '200px',
								backgroundImage: `url(http://localhost:4000/${food.food_image})`,
							}}>
							<div className='card-body d-flex flex-column justify-content-center align-items-center'>
								<h5 className='card-title '>
									{food.food_name}
								</h5>
								<p className='card-text text-success'>
									{food.food_price}
								</p>
								<button
									type='button'
									className='btn btn-primary'
									onClick={() => handleClick(food._id)}>
									Delete
								</button>
							</div>
						</div>
					</form>
				))
			) : (
				<h1>No data here</h1>
			)}
		</div>
	);
};

export default DeleteForm;
