import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

let UPDATE_FOOD = gql`
	mutation UpdateFood(
		$updateFoodId: ID!
		$foodName: String!
		$foodPrice: Int!
	) {
		updateFood(
			id: $updateFoodId
			food_name: $foodName
			food_price: $foodPrice
		) {
			status
			message
		}
	}
`;

let UpdateCategory = () => {
	let { id } = useParams();
	let foodRef = useRef();
	let priceRef = useRef();
	let [updateFood, { loading, error, data }] = useMutation(UPDATE_FOOD);

	let handleSubmit = () => {
		let food_name = foodRef.current.value;
		let food_price = +priceRef.current.value;
		let token = localStorage.getItem('token');
		updateFood({
			variables: {
				updateFoodId: id,
				foodName: food_name,
				foodPrice: food_price,
			},
			context: {
				headers: {
					authorization: `${token}`,
				},
			},
		});
	};

	return (
		<form className='flex-column form-group'>
			<label htmlFor='foodInput' className='form-label'>
				New Food Name
			</label>
			<input
				type='text'
				id='foodInput'
				ref={foodRef}
				placeholder='new food name'
				className='form-input form-control'
			/>
			<div className='form-group'>
				<label htmlFor='priceInput' className='form-label'>
					New Price
				</label>
				<input
					type='number'
					id='priceInput'
					ref={priceRef}
					placeholder='new price'
					className='form-input form-control'
				/>
			</div>

			<button
				type='submit'
				className='btn btn-success mt-2'
				onClick={() => handleSubmit()}>
				Change data
			</button>
		</form>
	);
};

export default UpdateCategory;
