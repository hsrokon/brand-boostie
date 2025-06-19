import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const { data, status, statusText } = useRouteError();
    const navigate = useNavigate();

    const handleNavigate = ()=> {
        navigate(-1);
    }
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-2">
            <button className="flex items-center p-1 rounded-lg cursor-pointer hover:bg-blue-300" onClick={handleNavigate}><img className="h-12" src={'https://i.ibb.co/QjJ55qVd/tr-reduced.png'}/></button>
            <p  className="text-xl text-primary font-semibold">{data}</p>
            <h1 className="text-4xl text-base-content font-bold">- {status} -</h1>
            <h2 className="text-3xl text-base-content font-semibold">{statusText}_</h2>
        </div>
    );
};

export default ErrorPage;