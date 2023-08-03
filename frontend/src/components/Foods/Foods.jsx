import react, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './../Header/Header';
import imageSrc from './../../Assets/Images/error.png';
import { gql, useQuery } from '@apollo/client';
import Modal from './../Modal/Modal';

let Foods = () => {
	let [order, setOrder] = useState([]);
	let { foodId } = useParams();

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
	useEffect(() => {
		const savedOrder = localStorage.getItem('selectedOrder');
		if (savedOrder) {
			setOrder(JSON.parse(savedOrder));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('selectedOrder', JSON.stringify(order));
	}, [order]);

	const { loading, error, data } = useQuery(Foods, { variables: { foodId } });
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	let handleClick = (food) => {
		const exists = order.some((item) => item._id === food._id);
		if (!exists) {
			setOrder([...order, food]);
		}
		return <Modal zakaz={order} />;
	};
	console.log(order);

	return (
		<>
			<Header />
			<div className='container mt-4'>
				<h2 className='mb-4'>Foods</h2>
				<div className='row'>
					{data.food.data?.length > 0 ? (
						data.food.data.map((food) => (
							<form
								className='col-md-4 text-decoration-none'
								key={food._id}>
								<div
									className='card mb-4'
									style={{
										height: '200px',
										backgroundImage: `url(http://localhost:4000/${food.food_image})`,
									}}>
									<div className='card-body d-flex flex-column card-body justify-content-center align-items-center'>
										<h5 className='card-title '>
											{food.food_name}
										</h5>
										<p className='card-text text-success'>
											{food.food_price}
										</p>
										<button
											type='submit'
											className='btn btn-primary'
											onClick={() => handleClick(food)}>
											Add
										</button>
									</div>
								</div>
							</form>
						))
					) : (
						<h1>Nothing to order here...</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default Foods;
