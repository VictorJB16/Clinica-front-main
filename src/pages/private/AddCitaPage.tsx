import { useUserSessionStore } from '../../store/UseUserSession'
import { jwtDecode } from "jwt-decode";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"

import { PublicUserInfo } from '../../types/PublicUserInfo';
import { AddCitaForm } from '../../components/AddCitaForm';
import { Button } from '../../components/ui/button';
import { logOutSession } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';


export const AddCitaPage = () => {
    const navigate = useNavigate();
    const { token, logOut } = useUserSessionStore(state => state)
    const user = jwtDecode<PublicUserInfo>(token ?? "");

    let isAdmin = false;
    if ( typeof(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) != "string") {
        const roleAdmin = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].find(x => x == "Admin")
        isAdmin = roleAdmin != undefined;
    } else {
        const roleAdmin = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        isAdmin = roleAdmin == 'Admin';
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className=" bg-white shadow-md rounded">
                <Card className='flex md:flex-row flex-col p-10 rounded-lg justify-center items-center'>
                    <CardHeader>
                        <CardTitle>{user.fullname}</CardTitle>
                        <CardDescription>{user.email} - {user.phone}</CardDescription>
                        <Button onClick={() => {
                            if (!isAdmin) return navigate('/citas-paciente');
                            return navigate('/citas-admin')

                        }} variant={'default'}>Citas registradas</Button>

                        <Button onClick={() => {
                            logOutSession();
                            logOut();
                            navigate('/login');
                        }} variant={'destructive'}>Cerrar sessión</Button>
                    </CardHeader>
                    <CardContent>
                        <AddCitaForm />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
