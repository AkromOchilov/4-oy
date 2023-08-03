import { useParams, Outlet } from 'react-router-dom';
import Category from './Category';

let Layout = () => {
	let { id } = useParams();

	return id ? <Outlet /> : <Category />;
};

export default Layout;
