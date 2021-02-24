import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, roles, ...rest }) => ({
  /* <Route
    {...rest}
    render={(props) => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();

      // check if route is restricted by role

      const isAuthorised =
        roles &&
        roles.some((role) => {
          return loggedInUser.role.includes(role);
        });

      console.log(isAuthorised);
      if (isAuthorised) {
        const newProps = { ...props, isAuthorised: true };
        return <Component {...newProps} />;
      } else {
        const newProps = { ...props, isAuthorised: false };
        return <Component {...newProps} />;
      }

      // authorised so return component
    }}
  /> */
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  role: state.auth.user.isAdmin,
});

export default connect(mapStateToProps)(PrivateRoute);
