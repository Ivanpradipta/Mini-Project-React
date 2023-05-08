import { Navigate} from "react-router-dom";
import { getAuth} from "firebase/auth";


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = getAuth().currentUser;
  
    return (
        user ? <Component {...rest} /> : <Navigate to="/login" replace />
    );
  };

export default ProtectedRoute;



