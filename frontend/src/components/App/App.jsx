import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Error from '../Error/Error';
import Create from '../Create/Category';
import Auth from './../Auth/Auth';
import Categories from './../Categories/Categories';
import Foods from './../Foods/Foods';
import Admin from './../Admin/Admin';

import AdminOrders from './../Orders/Orders';
import CreateCategory from './../Create/Category';
import CreateFood from './../Create/Food';
import UpdateCategory from './../Update/Category';
import UpdateCategoryForm from './../Update/updateCategory';
import UpdateFood from './../Update/Food';
import DeleteCategory from './../Delete/Category';
import DeleteFood from './../Delete/Food';

import CreateLayout from './../Create/layout';
import CreateFoodForm from './../Create/FoodForm';
import DeleteLayout from './../Delete/layout';
import DeleteForm from './../Delete/DeleteForm';
import FoodLayout from './../Update/foodLayout';
import UpdateFoodForm from './../Update/updateFood';

import Layout from './../Update/layout';

function App() {
	return (
		<>
			<Routes>
				<Route index element={<Categories />} />
				<Route
					path={'/create'}
					element={
						<Auth>
							<Create />
						</Auth>
					}
				/>
				<Route path={'*'} element={<Error />} />
				<Route path={'/login'} element={<Login />} />
				<Route
					path='/admin'
					element={
						<Auth>
							<Admin />
						</Auth>
					}>
					<Route path='orders' element={<AdminOrders />} />
					<Route
						path='create-category'
						element={<CreateCategory />}
					/>
					<Route path='create-food' element={<CreateLayout />}>
						<Route
							path={':categoryId'}
							element={<CreateFoodForm />}
						/>
					</Route>
					<Route path='update-category' element={<Layout />}>
						<Route path={':id'} element={<UpdateCategoryForm />} />
					</Route>
					<Route path='update-food' element={<FoodLayout />}>
						<Route path={':id'} element={<UpdateFoodForm />} />
					</Route>
					<Route
						path='delete-category'
						element={<DeleteCategory />}
					/>
					<Route path='delete-food' element={<DeleteLayout />}>
						<Route path={':id'} element={<DeleteForm />} />
					</Route>
				</Route>
				<Route path={'/categories'} element={<Categories />}>
					<Route path={':foodId'} element={<Foods />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
