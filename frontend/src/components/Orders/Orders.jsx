import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

let GET_ORDERS = gql`
	query Orders {
		orders {
			message
			status
			data {
				_id
				contact
				orders {
					food_id
					category_id
					food_name
					food_price
					count
				}
				username
			}
		}
	}
`;

let Orders = () => {
	let [bill, setBills] = useState([]);
	let [status, setStatus] = useState(true);

	const { loading, error, data } = useQuery(GET_ORDERS);

	useEffect(() => {
		if (data && data.orders.status === 200) {
			setBills(data.orders.data);
			console.log(data.orders.data);
		} else if (data && data.orders.status === 404) {
			setStatus(false);
		}
	}, [data]); // Only run when 'data' changes

	return (
		<div>
			{status ? (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Username</th>
							<th scope='col'>Orders</th>
							<th scope='col'>In total</th>
							<th scope='col'>Contact Number</th>
							<th scope='col'>Status</th>
						</tr>
					</thead>
					<tbody>
						{bill.map((order, index) => {
							const totalOrderPrice = order.orders.reduce(
								(total, food) =>
									total + food.food_price * food.count,
								0,
							);

							return (
								<tr key={order._id}>
									<th scope='row'>{++index}</th>
									<td>{order.username}</td>
									<td>
										{order.orders.map((food, foodIndex) => (
											<div key={foodIndex}>
												<p>
													Food: {food.food_name}*
													{food.count}, Price:{' '}
													{food.food_price}
												</p>
											</div>
										))}
									</td>
									<td>{totalOrderPrice}</td>
									<td>{order.contact}</td>
									<td>pending</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<h1> No orders found yet...</h1>
			)}
		</div>
	);
};

export default Orders;
