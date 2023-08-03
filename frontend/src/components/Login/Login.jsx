import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Login.scss';

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const navigator = useNavigate();
	const [loginError, setLoginError] = useState(false);

	const LOGIN_ADMIN = gql`
		mutation PostAdmin($username: String!, $password: String!) {
			postAdmin(username: $username, password: $password) {
				message
				status
				token
			}
		}
	`;

	const [loginAdmin, { loading, error, data }] = useMutation(LOGIN_ADMIN);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const username = usernameRef.current.value;
		const password = passwordRef.current.value;

		try {
			const { data } = await loginAdmin({
				variables: { username, password },
			});

			console.log(data);

			if (data.postAdmin.token) {
				window.localStorage.setItem('token', data.postAdmin.token);
				navigator('/admin/orders');
			} else {
				// Handle the case when the token is not returned or null
				setLoginError(true);
				console.error('Token not received.');
			}
		} catch (error) {
			setLoginError(true);
			console.error('Error while submitting:', error.message);
		}
	};

	return (
		<section className='login'>
			<div className='login__content'>
				<h2 className='login__heading'>
					Admin huquqlaridan foydalanish uchun ro'yhatdan o'ting!
				</h2>

				<form className='login__box' onSubmit={handleSubmit}>
					{loginError ? (
						<h3 className='login__title'>You are not admin</h3>
					) : (
						<h3 className='login__title'>Login</h3>
					)}
					<input
						ref={usernameRef}
						className='login__input'
						type='text'
						placeholder={'Login'}
					/>
					<input
						ref={passwordRef}
						className='login__input'
						type='password'
						placeholder={'Password'}
					/>
					<button className='login__submit' type={'submit'}>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
