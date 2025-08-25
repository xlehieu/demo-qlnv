import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { IStaff } from '../../../interfaces/NhanVien';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { toast } from 'sonner';
import { removeStaff, upsert as upsert } from '../../../features/StaffSlice';
import { PATH } from '../../../common/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { isOver18 } from '../../../common/utils';
const initStaff = {
    ID: 0,
    Name: '',
    DOB: new Date(),
    Gender: '',
    Email: '',
    Address: '',
};
const StaffUpsert = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const staff = useSelector((state: RootState) => state.staff);
    const [data, setData] = useState<IStaff>({
        ...initStaff,
        ...staff.find((item) => item.ID === Number(params.id)),
        // lấy ra id của ông cuối cùng rồi +1
        ID: params.id ? Number(params.id) : staff[staff.length - 1].ID + 1,
    });
    const [error, setError] = useState<any>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setError({
            ...error,
            [e.target.name]: '',
        });
        let { name, value }: any = e.target;
        if (!name) return toast.error('Lỗi');
        if (name === 'DOB') {
            //2025-08-07T00:00:00.000Z
            value = new Date(value);
            if (!isOver18(value)) {
                setError((prev: any) => ({
                    ...prev,
                    DOB: 'Nhân viên phải đủ 18 tuổi',
                }));
            }
        }
        setData({
            ...data,
            [name]: value,
        });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError((prev: any) => ({
                ...prev,
                Email: 'Email không được để trống',
            }));
            return false;
        }
        if (!emailRegex.test(email)) {
            setError((prev: any) => ({
                ...prev,
                Email: 'Email không hợp lệ',
            }));
            return false;
        }
        return true;
    };
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
    const validateForm = () => {
        const newErrors: any = {};
        if (!data.Name) newErrors.Name = 'Tên không được để trống';
        if (!data.DOB) newErrors.DOB = 'Ngày sinh không được để trống';
        if (!data.Gender) newErrors.Gender = 'Giới tính không được để trống';
        if (!data.Email) newErrors.Email = 'Email không được để trống';
        if (!data.Address) newErrors.Address = 'Địa chỉ không được để trống';
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // thêm hoặc sửa
    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin');
            return;
        }
        if (!validateEmail(data.Email)) {
            toast.error('Email không hợp lệ');
            return;
        }
        if (!isOver18(data.DOB)) {
            toast.error('Ngày sinh không hợp lệ');
            setError((prev: any) => ({
                ...prev,
                DOB: 'Tuổi nhân viên phải lớn hơn 18',
            }));
            return;
        }
        dispatch(upsert(data));
        toast.success('Lưu thành công');
    };
    const handleDelete = () => {
        dispatch(removeStaff(data));
        toast.success('Xóa thành công');
        setTimeout(() => navigate(PATH.staff_list), 1000);
    };
    const formatDate = (date: Date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };
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
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="ID" className="block text-gray-600 mb-1">
                        ID
                    </label>
                    <input
                        id="ID"
                        name="ID"
                        placeholder="Nhập ID"
                        type="text"
                        value={data.ID}
                        disabled
                        readOnly
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Name" className="block text-gray-600 mb-1">
                        Họ và tên
                    </label>
                    <input
                        id="Name"
                        name="Name"
                        placeholder="Nhập họ và tên"
                        type="text"
                        value={data.Name}
                        onChange={handleChange}
                        tabIndex={1}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error?.Name && <span className="text-red-500">{error.Name}</span>}
                </div>
                {/* Ngày sinh */}
                <div className="mb-4">
                    <label htmlFor="DOB" className="block text-gray-600 mb-1">
                        Ngày sinh
                    </label>
                    <input
                        id="DOB"
                        name="DOB"
                        placeholder="Nhập ngày sinh"
                        type="date"
                        onChange={handleChange}
                        value={formatDate(data.DOB)}
                        tabIndex={2}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error?.DOB && <span className="text-red-500">{error.DOB}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Gender" className="block text-gray-600 mb-1">
                        Giới tính
                    </label>
                    <select
                        id="Gender"
                        name="Gender"
                        value={data.Gender}
                        onChange={handleChange}
                        tabIndex={3}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Chọn giới tính
                        </option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    {error?.Gender && <span className="text-red-500">{error.Gender}</span>}
                </div>
                {/* email */}
                <div className="mb-4">
                    <label htmlFor="Email" className="block text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        id="Email"
                        name="Email"
                        placeholder="Nhập email"
                        type="email"
                        value={data.Email}
                        tabIndex={4}
                        onChange={handleChange}
                        required
                        onBlur={(e) => validateEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error?.Email && <span className="text-red-500">{error.Email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Address" className="block text-gray-600 mb-1">
                        Địa chỉ
                    </label>
                    <textarea
                        id="Address"
                        name="Address"
                        placeholder="Nhập địa chỉ"
                        value={data.Address}
                        tabIndex={5}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error?.Address && <span className="text-red-500">{error.Address}</span>}
                </div>
                <div className="mb-4 flex flex-row gap-4">
                    {!params.id ? (
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Lưu
                        </button>
                    ) : (
                        <Fragment>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cập nhật
                            </button>
                            <button
                                type="submit"
                                onClick={handleDelete}
                                className="w-full bg-red-500 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Xóa
                            </button>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffUpsert;
