import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const PublicRoute = ({component: Component, ...rest}) => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <Route 
            {...rest} 
            render={props => 
            currentUser.id ? <Redirect to="/dashboard" />
            : <Component {...props} />} 
        />
    );
};

export default PublicRoute;