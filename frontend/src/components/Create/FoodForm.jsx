import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

let CREATE_FOOD = gql`
	mutation CreateYourFood(
		$foodImage: Upload!
		$categoryId: ID!
		$foodName: String!
		$foodPrice: Int!
	) {
		createYourFood(
			foodImage: $foodImage
			category_id: $categoryId
			food_name: $foodName
			food_price: $foodPrice
		) {
			status
			message
			data {
				_id
				category_id
				food_name
				food_image
				food_price
			}
		}
	}
`;
let FoodForm = () => {
	let { categoryId } = useParams();
	console.log(categoryId, 'categoryId');
	let foodRef = useRef();
	let priceRef = useRef();
	let imageRef = useRef();

	const [createFood, { loading, error, data }] = useMutation(CREATE_FOOD, {
		onCompleted: (data) => {
			console.log('Mutation completed:', data);
		},
		onError: (error) => {
			console.log('Mutation error:', error);
		},
	});

	let handleCreate = async () => {
		let token = localStorage.getItem('token');
		let food_name = foodRef.current.value;
		let food_price = +priceRef.current.value;
		let file = imageRef.current.files[0];
		if (!file) return console.log('error');
		console.log(file);
		try {
			await createFood({
				variables: {
					foodImage: file,
					categoryId,
					foodName: food_name,
					foodPrice: food_price,
				},
				context: {
					headers: {
						authorization: `${token}`,
					},
				},
			}).catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div>
				<div className='form-group'>
					<label htmlFor='foodName' className='form-label'>
						Food name
					</label>
					<input
						type='text'
						id='foodName'
						className='form-input'
						ref={foodRef}
						placeholder='food name'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='foodPrice' className='form-label'>
						Food Price
					</label>
					<input
						type='number'
						id='foodPrice'
						className='form-input'
						ref={priceRef}
						placeholder='Food Price'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='imageInput' className='form-label'>
						Background image
					</label>
					<input
						type='file'
						id='imageInput'
						className='form-input'
						placeholder='Image'
						ref={imageRef}
					/>
				</div>

				<button
					type='submit'
					className='btn btn-success'
					onClick={() => handleCreate()}>
					Create a Food
				</button>
			</div>
		</>
	);
};

export default FoodForm;
