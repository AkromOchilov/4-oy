import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

let Food = () => {
	let Category = gql`
		query Category {
			category {
				message
				status
				data {
					_id
					category_image
					category_name
				}
			}
		}
	`;

	let { loading, error, data } = useQuery(Category);
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	data = data.category.data;

	console.log(data);

	return (
		<div className='row'>
			{data?.length > 0 ? (
				data.map((category) => (
					<Link
						className='col-md-4 card text-decoration-none'
						key={category._id}
						style={{
							height: '200px',
							backgroundImage: `url(http://localhost:4000/${category.category_image})`,
						}}
						to={`/admin/create-food/${category._id}`}>
						<div className='card mb-4'>
							<div className='d-flex card-body justify-content-center align-items-center'>
								<h5 className='card-title '>
									{category.category_name}
								</h5>
							</div>
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
