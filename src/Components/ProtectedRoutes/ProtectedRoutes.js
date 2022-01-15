import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getUser} from '../../Utility/util'

export default function ProtectedRoutes({ component: PureComponent, exact, ...rest }) {
    console.log('getUser()',getUser());
    return ( <Route
        exact={exact}
        {...rest}
        render={props =>
            getUser() !== false ? (
                <PureComponent {...props} />
            ) : (
                <Redirect
                    exact
                    to={{
                        pathname:'/login',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />);

}