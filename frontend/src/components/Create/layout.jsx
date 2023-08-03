import { useParams, Outlet } from 'react-router-dom';
import Food from './Food';

let Layout = () => {
	let { categoryId } = useParams();
	return categoryId ? <Outlet /> : <Food />;
};

export default Layout;
