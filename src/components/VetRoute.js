import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast, } from "react-toastify";
const PrivateRoute = ({ children, ...rest }) => {
  
  const permissao = useSelector(state => state.user.user.funcao);
  
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (permissao === 'Médico') {
          return children
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute