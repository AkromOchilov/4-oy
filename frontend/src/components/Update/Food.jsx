import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

let Food = () => {
	let Foods = gql`
		query Foods {
			foods {
				status
				message
				data {
					_id
					category_id
					food_name
					food_price
					food_image
				}
			}
		}
	`;

	let { loading, error, data } = useQuery(Foods);
	if (loading) return 'loading';
	if (error) return error;

	return (
		<div className='row'>
			{data.foods.data?.length > 0 ? (
				data.foods.data.map((food) => (
					<Link
						key={food._id}
						to={`/admin/update-food/${food._id}`}
						style={{
							height: '200px',
							backgroundImage: `url(http://localhost:4000/${food.food_image})`,
						}}
						className='card col-md-4 text-decoration-none text-center align-items-center justify-content-center m-2'>
						<div className='card-body d-flex flex-column justify-content-center align-items-center'>
							<h2 className='card-title'>{food.food_name}</h2>
							<p className='card-text text-bg-success p-2 rounded-1'>
								{food.food_price}
							</p>
						</div>
					</Link>
				))
			) : (
				<h1>No data here...</h1>
			)}
		</div>
	);
};

export default Food;
