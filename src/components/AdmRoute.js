import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast ,ToastContainer } from "react-toastify";

const PrivateRoute = ({ children, ...rest }) => {
  
  const permissao = useSelector(state => state.user);
  const { funcao } = permissao.userLog.user
  console.log('bateu na private')
  return (
    <Route
      {...rest}
      render={({ location }) => {
        
        if (funcao !== 'Administrativo'  ) {
          
          return children
        }

        return (
        toast.warning("Voce nao possui permissão "),
          <Link
            to={{
              pathname: '/dashboard'
            
            }}
          />
        )
      }}
      
    >
      
    <ToastContainer></ToastContainer>
    </Route>
  )
}

export default PrivateRoute