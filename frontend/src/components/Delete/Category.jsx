import { useNavigate, Link, useParams, Outlet } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

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

let DELETE_CATEGORY = gql`
	mutation DeleteCategory($deleteCategoryId: String!) {
		deleteCategory(id: $deleteCategoryId) {
			message
			status
		}
	}
`;

let DeleteCategory = () => {
	let { loading, error, data } = useQuery(Categories);
	let [deleteCategory, { load, err, base }] = useMutation(DELETE_CATEGORY);

	let handleDelete = (id) => {
		let token = localStorage.getItem('token');
		deleteCategory({
			variables: {
				deleteCategoryId: id,
			},
			context: {
				headers: {
					authorization: `${token}`,
				},
			},
		});
	};

	console.log(data);
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return (
		<form className='row'>
			{data.category.data?.length > 0 ? (
				data.category.data.map((category) => (
					<div
						className='card-body col-md-4 d-flex flex-column align-items-center justify-content-center'
						key={category._id}
						style={{
							height: '200px',
							backgroundImage: `url(http://localhost:4000/${category.category_image})`,
						}}>
						<h2 className='card-title fs-4 text-center mb-4'>
							{category.category_name}
						</h2>
						<button
							button='submit'
							className='btn btn-danger fs-6 text-decoration-none'
							onClick={() => handleDelete(category._id)}>
							Delete
						</button>
					</div>
				))
			) : (
				<h1>No data here...</h1>
			)}
		</form>
	);
};

export default DeleteCategory;
