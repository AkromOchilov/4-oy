import { useParams, Outlet } from 'react-router-dom';
import Food from './Food';

let Layout = () => {
	let { id } = useParams();

	return id ? <Outlet /> : <Food />;
};

export default Layout;
