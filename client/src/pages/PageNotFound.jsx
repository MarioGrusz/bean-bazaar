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
        <h1>404</h1>
        <p>Oops!</p>
        <p>The page was not found...</p>
      </main>
    )
}

export default PageNotFound