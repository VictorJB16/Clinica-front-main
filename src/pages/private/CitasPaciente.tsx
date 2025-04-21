import { useEffect } from 'react';
import { columnsCitasUser } from '../../api/Citas/columsCitasUser';
import { DataTable } from '../../components/DataTables'
import { useCitasStore } from '../../store/UseCitas';
import { getCitas } from '../../api/Citas/getCitas';
import { useUserSessionStore } from '../../store/UseUserSession';

export const CitasPaciente = () => {
    const { token } = useUserSessionStore(state => state);
    const { citas, setCitas } = useCitasStore(state => state);

    useEffect(() => {
        const loadCitas = async () => {
            const data = await getCitas(token ?? "");
            if (!data.error) {
                setCitas(data.response);
                return;
            }
            console.log("Hubo un error al consultar los datos");
        }

        loadCitas();
    }, [])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className=" bg-white shadow-md rounded">
                <DataTable data={citas} columns={columnsCitasUser} />
            </div>
        </div>
    )
}
