import React, { useState, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_CATEGORY = gql`
	mutation createCategory($file: Upload!, $category_name: String!) {
		createCategory(file: $file, category_name: $category_name) {
			data {
				_id
				category_image
				category_name
			}
			message
			status
		}
	}
`;

const CreateCategory = () => {
	let inputRef = useRef();
	let categoryRef = useRef();
	const [createCategory, { loading, error, data }] =
		useMutation(CREATE_CATEGORY);

	console.log(data);
	let token = localStorage.getItem('token');

	const handleSubmit = async () => {
		let file = inputRef.current.files[0];
		let category_name = categoryRef.current.value;
		if (!file) return console.log('error');
		createCategory({
			variables: { file, category_name },
			context: {
				headers: {
					authorization: `${token}`,
				},
			},
		});
	};

	return (
		<div className='container'>
			<h2>Add Category</h2>
			<form>
				<div className='form-group mb-3'>
					<label htmlFor='categoryName'>Category Name</label>
					<input
						type='text'
						className='form-control'
						ref={categoryRef}
						id='categoryName'
						placeholder='Enter category name'
					/>
				</div>
				<div className='form-group d-flex flex-column mb-3'>
					<label htmlFor='categoryImage'>Category Image</label>
					<input
						type='file'
						className='form-control-file'
						ref={inputRef}
						id='categoryImage'
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={() => handleSubmit()}>
					Add Category
				</button>
			</form>
		</div>
	);
};

export default CreateCategory;
