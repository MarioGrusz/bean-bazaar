import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PageNotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }, [])

    return (
        <main className='page-not-found'>
            <div className='page-not-found__container'>
                <h1>404</h1>
                <p>Oops! The page was not found...</p>
                <div className='page-not-found__round-element'></div>
            </div>
        </main>
    )
}

export default PageNotFound