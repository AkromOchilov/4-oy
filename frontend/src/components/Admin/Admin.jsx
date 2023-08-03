import { Link, Outlet } from 'react-router-dom';

let Admin = () => {
	return (
		<>
			<h1 className='title text-center'>Welcome to admin-panel</h1>
			<main className='row container' style={{ height: '100vh' }}>
				<div className='col-md-3 bg-danger p-0'>
					<div className='list-group h-auto w-100 rounded-0 mt-5'>
						<Link
							to={'/admin/orders'}
							className='list-group-item list-group-item-action'
							aria-current='true'>
							Orders
						</Link>
						<Link
							to={'/admin/create-category'}
							className='list-group-item list-group-item-action'>
							create a category
						</Link>
						<Link
							to={'/admin/create-food'}
							className='list-group-item list-group-item-action'>
							create a food
						</Link>
						<Link
							to={'/admin/update-category'}
							className='list-group-item list-group-item-action'>
							update a category
						</Link>
						<Link
							to={'/admin/update-food'}
							className='list-group-item list-group-item-action'>
							update a food
						</Link>
						<Link
							to={'/admin/delete-category'}
							className='list-group-item list-group-item-action'>
							delete a category
						</Link>
						<Link
							to={'/admin/delete-food'}
							className='list-group-item list-group-item-action'>
							delete a food
						</Link>
					</div>
				</div>
				<div className='col-md-9 pt-5 px-5'>
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Admin;
