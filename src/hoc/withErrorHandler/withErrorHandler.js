import React, { useState, useEffect } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../component/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req;
        })
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
        });

        useEffect(() => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }, [reqInterceptor, resInterceptor]);
        // we write this to reduce memory redundancy so that they are destroyed as soon as the component is not required
        //-------Just for testing 
        //console.log('Will unmount be called',this.resInterceptor,this.reqInterceptor);

    

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return (
        <Auxillary>
            <Modal show={error} modalClosed={errorConfirmedHandler}>
                {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </Auxillary>
    )
    }
}
export default withErrorHandler;