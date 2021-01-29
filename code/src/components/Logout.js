import React from 'react';
import { withRouter } from 'react-router'

function Logout(props) {

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        props.history.push('/login')
    }

    return <button variant="primary" className="custom-button" onClick={logout}>Déconnexion</button>
}

export default withRouter(Logout)