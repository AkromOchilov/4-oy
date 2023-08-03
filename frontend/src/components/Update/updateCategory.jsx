import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

let UPDATE_CATEGORY = gql`
	mutation updateCategory(
		$updateCategoryId: String!
		$categoryName: String!
	) {
		updateCategory(id: $updateCategoryId, category_name: $categoryName) {
			status
			message
		}
	}
`;

let UpdateCategory = () => {
	let { id } = useParams();
	let categoryRef = useRef();
	let [updateCategory, { loading, error, data }] =
		useMutation(UPDATE_CATEGORY);

	let handleSubmit = () => {
		let token = localStorage.getItem('token');
		let category_name = categoryRef.current.value;
		updateCategory({
			variables: { updateCategoryId: id, categoryName: category_name },
			context: {
				headers: {
					authorization: `${token}`,
				},
			},
		});
	};

	return (
		<form className='flex-column form-group'>
			<label htmlFor='categoryInput' className='form-label'>
				New Category Name
			</label>
			<input
				type='text'
				id='categoryInput'
				ref={categoryRef}
				placeholder='new category name'
				className='form-input form-control'
			/>

			<button
				type='submit'
				className='btn btn-success mt-2'
				onClick={() => handleSubmit()}>
				Change Name
			</button>
		</form>
	);
};

export default UpdateCategory;
