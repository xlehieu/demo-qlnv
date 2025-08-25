import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { getStaffById } from '../../../features/StaffSlice';
import { PATH } from '../../../common/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../common/utils';
const StaffDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const staff = useSelector((state: RootState) => getStaffById(state.staff, Number(params.id)));

    return (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-4">Thông tin nhân viên</h3>

                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-md h-8 text-center"
                    onClick={() => navigate(PATH.staff_list)}
                >
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    Danh sách
                </button>
            </div>
            <table>
                <tbody className="table_custom">
                    <tr className="bg-gray-200">
                        <td width={200} className="font-bold">
                            ID
                        </td>
                        <td>{staff?.ID}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Họ và tên</td>
                        <td>{staff?.Name}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="font-bold">Ngày sinh</td>
                        <td>{formatDate(staff?.DOB)}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Giới tính</td>
                        <td>{staff?.Gender}</td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="font-bold">Email</td>
                        <td>{staff?.Email}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Địa chỉ</td>
                        <td>{staff?.Address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StaffDetail;
