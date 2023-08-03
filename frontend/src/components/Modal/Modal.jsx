import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imageSrc from './../../Assets/Images/error.png';
import { useMutation, gql } from '@apollo/client';

let ORDERS_MUTATION = gql`
	mutation Orders($username: String!, $contact: String!, $orders: [Order]) {
		orders(username: $username, contact: $contact, orders: $orders) {
			message
			status
		}
	}
`;

let Modal = () => {
	let [orders, setOrders] = useState([]);
	const [categoryCounts, setCategoryCounts] = useState({});
	let usernameRef = useRef();
	let contactRef = useRef();
	let navigator = useNavigate();

	useEffect(() => {
		const savedOrder = localStorage.getItem('selectedOrder');
		if (savedOrder) {
			setOrders(JSON.parse(savedOrder));
		}
	}, []);

	// Function to handle incrementing the count for a category
	const handleIncrement = (category) => {
		setCategoryCounts((prevCounts) => ({
			...prevCounts,
			[category]: (prevCounts[category] || 0) + 1,
		}));
	};

	// Function to handle decrementing the count for a category
	const handleDecrement = (category) => {
		setCategoryCounts((prevCounts) => ({
			...prevCounts,
			[category]: Math.max((prevCounts[category] || 0) - 1, 0),
		}));
	};

	let [submitOrders, { loading, error, data }] = useMutation(ORDERS_MUTATION);

	let handleSubmit = async () => {
		let username = usernameRef.current.value;
		let contact = contactRef.current.value;

		const Order = orders.map((order) => ({
			food_id: order._id,
			category_id: order.category_id,
			food_name: order.food_name,
			food_price: order.food_price,
			count: categoryCounts[order.food_name] || 1,
		}));
		try {
			await submitOrders({
				variables: {
					username,
					contact,
					orders: Order,
				},
			});
			localStorage.clear();
			navigator('/categories');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className='offcanvas offcanvas-start w-50'
			data-bs-scroll='true'
			tabIndex='-1'
			id='offcanvasWithBothOptions'
			aria-labelledby='offcanvasWithBothOptionsLabel'>
			<div className='offcanvas-header'>
				<h5
					className='offcanvas-title'
					id='offcanvasWithBothOptionsLabel'>
					Order is about to be ready...
				</h5>
				<button
					type='button'
					className='btn-close'
					data-bs-dismiss='offcanvas'
					aria-label='Close'></button>
			</div>
			<div className='offcanvas-body row'>
				<form className='d-flex flex-column col-md-6'>
					<div className='mb-3'>
						<label
							htmlFor='exampleInputUsername1'
							className='form-label'>
							Your username
						</label>
						<input
							type='text'
							className='form-control'
							id='exampleInputUsername1'
							ref={usernameRef}
							aria-describedby='usernameHelp'
						/>
						<div id='usernameHelp' className='form-text'>
							Your data will not be shared with others.
						</div>
					</div>
					<div className='mb-3'>
						<label htmlFor='InputContact' className='form-label'>
							Your contact number
						</label>
						<input
							type='tel'
							className='form-control'
							id='InputContact'
							ref={contactRef}
						/>
					</div>
					<button
						type='button'
						className='btn btn-primary'
						onClick={() => handleSubmit()}>
						Submit
					</button>
				</form>
				<div className='col-md-6'>
					<div
						className='cards-container'
						style={{
							height: 'calc(100vh - 80px)', // Adjust the height to your needs
							overflowY: 'auto',
						}}>
						{orders?.length > 0 ? (
							orders.map((order) => (
								<div
									className='text-decoration-none'
									key={order._id}>
									<div
										className='card mb-4'
										style={{
											height: '200px',
											backgroundImage: `url(http://localhost:4000/${order.food_image})`,
										}}>
										<div className='card-body d-flex flex-column card-body'>
											<h5 className='card-title '>
												{order.food_name}
											</h5>
											<p className='card-text text-success'>
												{order.food_price}
											</p>
											<div className='d-flex'>
												<button
													type='button'
													className='btn btn-sm btn-primary me-2'
													onClick={() =>
														handleDecrement(
															order.food_name,
														)
													}
													disabled={
														categoryCounts[
															order.food_name
														] <= 0
													}>
													-
												</button>
												<span>
													{categoryCounts[
														order.food_name
													] || 0}
												</span>
												<button
													type='button'
													className='btn btn-sm btn-primary ms-2'
													onClick={() =>
														handleIncrement(
															order.food_name,
														)
													}>
													+
												</button>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<h1>You do not have orders yet...</h1>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
