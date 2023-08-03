import { useNavigate, Link, useParams, Outlet } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

let Categories = gql`
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
let UpdateCategory = () => {
	const { loading, error, data } = useQuery(Categories);
	console.log(data);
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return (
		<div className='row'>
			{data.category.data?.length > 0 ? (
				data.category.data.map((category) => (
					<Link
						className='card-body col-md-4 d-flex text-decoration-none align-items-center justify-content-center'
						key={category._id}
						to={`/admin/update-category/${category._id}`}
						style={{
							height: '200px',
							backgroundImage: `url(http://localhost:4000/${category.category_image})`,
						}}>
						<h2 className='card-title fs-2 text-center'>
							{category.category_name}
						</h2>
					</Link>
				))
			) : (
				<h1>No data here...</h1>
			)}
		</div>
	);
};

export default UpdateCategory;
