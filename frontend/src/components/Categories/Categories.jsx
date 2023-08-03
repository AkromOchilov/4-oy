import React from 'react';
import imageSrc from './../../Assets/Images/error.png';
import { useParams, Outlet, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Header from './../Header/Header';

const Categories = () => {
	let { foodId } = useParams();
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

	const { loading, error, data } = useQuery(Categories);
	console.log(data);
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return foodId ? (
		<Outlet />
	) : (
		<>
			<Header />
			<div className='container mt-4'>
				<h2 className='mb-4'>Categories</h2>
				<div className='row'>
					{data.category.data?.length > 0 ? (
						data.category.data.map((category) => (
							<Link
								className='col-md-4 text-decoration-none'
								key={category._id}
								to={`/categories/${category._id}`}>
								<div
									className='card mb-4'
									style={{
										height: '200px',
										backgroundImage: `url(http://localhost:4000/${category.category_image})`,
										backgroundSize: 'auto',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center center',
									}}>
									<div className='d-flex card-body justify-content-center align-items-center'>
										<h5 className='card-title '>
											{category.category_name}
										</h5>
										{/* Add any additional information about the category here */}
									</div>
								</div>
							</Link>
						))
					) : (
						<h1>No categories added yet...</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default Categories;
