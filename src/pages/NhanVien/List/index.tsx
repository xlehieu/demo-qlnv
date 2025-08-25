import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { formatDate } from '../../../common/utils';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../common/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faEdit,
    faEye,
    faPlus,
    faRemove,
    faSort,
    faSortDown,
    faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { removeStaff } from '../../../features/StaffSlice';
import { toast } from 'sonner';
import DropdownSelect from '../../../components/UI/Select';

const typePagninate = {
    prev: 'prev',
    next: 'next',
};
const selectOptionsName = {
    currentIcon: faSort,
    options: [
        { value: '', label: '' },
        { value: 'ascHo', label: 'Tăng dần theo họ', icon: faSortUp },
        { value: 'descHo', label: 'Giảm dần theo họ', icon: faSortDown },
        { value: 'ascName', label: 'Tăng dần theo tên', icon: faSortUp },
        { value: 'descName', label: 'Giảm dần theo tên', icon: faSortDown },
    ],
    currentValue: '',
};
const selectOptionsAddress = {
    currentIcon: faSort,
    options: [
        { value: '', label: '' },
        { value: 'asc', label: 'Tăng dần', icon: faSortUp },
        { value: 'desc', label: 'Giảm dần', icon: faSortDown },
    ],
    currentValue: '',
};
const getFirstCharacter = (str: string) => {
    const Character = str.split(' ')[0][0];
    console.log(Character);
    return Character;
};
const getLastCharacter = (str: string) => str.split(' ').slice(-1)[0][0];
const StaffList = () => {
    const [currentSortName, setCurrentSortName] = useState(selectOptionsName);
    const [currentSortAddress, setCurrentSortAddress] = useState(selectOptionsAddress);
    const [staff, setStaff] = useState(useSelector((state: RootState) => state.staff));
    useEffect(() => {
        if (!currentSortName.currentValue) return;
        else if (currentSortName.currentValue === 'ascHo') {
            // <0 thì không swap, >0 thì swap
            // L.localCompare(N) thì L đứng trước N => <0 => ko swap
            // N.localCompare(L) thì N-L >0 => swap
            //[N,L] => sort((a,b)=>b-a) thì L-N <0 => không swap
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    // nếu đã sắp xếp theo địa chỉ rồi
                    // => thì return về những ông nào có địa chỉ bằng nhau và sẽ swap tên
                    // ví dụ  Na có địa chỉ là A và Nb có địa chỉ là B
                    // => nếu đã sắp xếp theo địa chỉ rồi => Na,Nb
                    // thì sẽ xuống dưới sắp xếp lại địa chỉ
                    // vì nếu sắp xếp địa chỉ rồi thì phải đổi thông tin địa chỉ trước đã
                    // sau đó nếu bằng 0 rồi thì xuống trường hợp dưới
                    if (currentSortAddress.currentValue === 'asc') {
                        const addressComparison = getFirstCharacter(a.Address).localeCompare(
                            getFirstCharacter(b.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    if (currentSortAddress.currentValue === 'desc') {
                        const addressComparison = getFirstCharacter(b.Address).localeCompare(
                            getFirstCharacter(a.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    return getFirstCharacter(a.Name).localeCompare(getFirstCharacter(b.Name), 'vi-VN');
                });
            });
        } else if (currentSortName.currentValue === 'descHo') {
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    if (currentSortAddress.currentValue === 'asc') {
                        const addressComparison = getFirstCharacter(a.Address).localeCompare(
                            getFirstCharacter(b.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    if (currentSortAddress.currentValue === 'desc') {
                        const addressComparison = getFirstCharacter(b.Address).localeCompare(
                            getFirstCharacter(a.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    return getFirstCharacter(b.Name).localeCompare(getFirstCharacter(a.Name), 'vi-VN');
                });
            });
        } else if (currentSortName.currentValue === 'ascName') {
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    if (currentSortAddress.currentValue === 'asc') {
                        const addressComparison = getFirstCharacter(a.Address).localeCompare(
                            getFirstCharacter(b.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    if (currentSortAddress.currentValue === 'desc') {
                        const addressComparison = getFirstCharacter(b.Address).localeCompare(
                            getFirstCharacter(a.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    return getLastCharacter(a.Name).localeCompare(getLastCharacter(b.Name), 'vi-VN');
                });
            });
        } else if (currentSortName.currentValue === 'descName') {
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    if (currentSortAddress.currentValue === 'asc') {
                        const addressComparison = getFirstCharacter(a.Address).localeCompare(
                            getFirstCharacter(b.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    if (currentSortAddress.currentValue === 'desc') {
                        const addressComparison = getFirstCharacter(b.Address).localeCompare(
                            getFirstCharacter(a.Address),
                            'vi-VN',
                        );
                        if (addressComparison !== 0) return addressComparison;
                    }
                    return getLastCharacter(b.Name).localeCompare(getLastCharacter(a.Name), 'vi-VN');
                });
            });
        }
    }, [currentSortName]);
    useEffect(() => {
        if (!currentSortAddress.currentValue) return;
        else if (currentSortAddress.currentValue === 'asc') {
            //nếu đã so sánh theo tên rồi thì chỉ cần sắp xếp lại nhưng ông nào có địa chỉ đứng trước thì swap
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    if (a.Name && b.Name && currentSortName.currentValue === 'ascHo') {
                        const nameComparison = getFirstCharacter(a.Name).localeCompare(
                            getFirstCharacter(b.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'descHo') {
                        const nameComparison = getFirstCharacter(b.Name).localeCompare(
                            getFirstCharacter(a.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'ascName') {
                        const nameComparison = getLastCharacter(a.Name).localeCompare(
                            getLastCharacter(b.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'descName') {
                        const nameComparison = getLastCharacter(b.Name).localeCompare(
                            getLastCharacter(a.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    return getFirstCharacter(a.Address).localeCompare(getFirstCharacter(b.Address), 'vi-VN');
                });
            });
        } else if (currentSortAddress.currentValue === 'desc') {
            setStaff((prev) => {
                return [...prev].sort((a, b) => {
                    if (a.Name && b.Name && currentSortName.currentValue === 'ascHo') {
                        const nameComparison = getFirstCharacter(a.Name).localeCompare(
                            getFirstCharacter(b.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'descHo') {
                        const nameComparison = getFirstCharacter(b.Name).localeCompare(
                            getFirstCharacter(a.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'ascName') {
                        const nameComparison = getLastCharacter(a.Name).localeCompare(
                            getLastCharacter(b.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    if (a.Name && b.Name && currentSortName.currentValue === 'descName') {
                        const nameComparison = getLastCharacter(b.Name).localeCompare(
                            getLastCharacter(a.Name),
                            'vi-VN',
                        );
                        if (nameComparison !== 0) return nameComparison;
                    }
                    return getFirstCharacter(b.Address).localeCompare(getFirstCharacter(a.Address), 'vi-VN');
                });
            });
        }
    }, [currentSortAddress]);
    //  ID: number;
    // Name: string;
    // DOB: Date;
    // Gender: string;
    // Email: string;
    // Address: string;

    const navigate = useNavigate();
    useEffect(() => {
        console.info('staff change', staff);
    }, [staff]);
    const handleAddStaff = () => {
        navigate(PATH.staff_create);
    };
    // hiển thị 15
    const itemPerPage = 5;
    const totalPage = Math.ceil(staff.length / itemPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const indexStart = (currentPage - 1) * itemPerPage;
    const indexEnd = indexStart + itemPerPage;
    const staffDisplay = useMemo(() => staff.slice(indexStart, indexEnd), [staff, indexStart, indexEnd]);
    const dispatch = useDispatch();
    const handleRemoveStaff = (ID: number, Name: string) => {
        if (!confirm(`Bạn có chắc chắn muốn xóa nhân viên ${Name} không?`)) return;
        dispatch(removeStaff({ ID }));
        setStaff(staff.filter((member) => member.ID !== ID));
        toast.success('Xóa nhân viên thành công!');
    };
    const handlePaginate = (type: string) => {
        if (type === typePagninate.next && currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        } else if (type === typePagninate.prev && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <section>
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md h-8" onClick={handleAddStaff}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Thêm mới
                </button>
            </div>
            <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden overflow-x-auto">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            <div className="flex">
                                <span>Họ và tên</span>
                                <DropdownSelect select={currentSortName} setSelect={setCurrentSortName} />
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Ngày sinh</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Giới tính</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            <div className="flex">
                                <span>Địa chỉ</span>
                                <DropdownSelect select={currentSortAddress} setSelect={setCurrentSortAddress} />
                            </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left max-w-[120px]">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {staffDisplay?.map((member) => (
                        <tr key={member.ID} className="hover:bg-gray-50 transition hover:cursor-pointer">
                            <td className="border border-gray-300 px-4 py-2">{member.ID}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{member.Name}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{formatDate(member?.DOB)}</td>
                            <td className="border border-gray-300 px-4 py-2 ">{member.Gender}</td>
                            <td className="border border-gray-300 px-4 py-2">{member.Email}</td>
                            <td className="border border-gray-300 px-4 py-2 max-w-[300px]">
                                <span className="w-full inline-block truncate">{member.Address}</span>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 ">
                                <div className="flex justify-between gap-2">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="text-blue-500"
                                        onClick={() => navigate(PATH.staff_detail + '/' + member.ID)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-yellow-500"
                                        onClick={() => navigate(PATH.staff_update + '/' + member.ID)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faRemove}
                                        className="text-red-500"
                                        onClick={() => handleRemoveStaff(member.ID, member.Name)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center h-8 bg-white mt-3 justify-between">
                <div className="flex items-center gap-2">
                    <span className="pr-2">Trang</span>
                    <button
                        className="h-full text-center px-3 py-1 bg-gray-100 rounded-sm  active:scale-90 transition-transform duration-150"
                        onClick={() => handlePaginate(typePagninate.prev)}
                    >
                        <FontAwesomeIcon className="text-[12px]" icon={faChevronLeft} />
                    </button>
                    <span className="px-1">{currentPage}</span>
                    <button
                        className="h-full text-center px-3 py-1 bg-gray-100 rounded-sm  active:scale-90 transition-transform duration-150"
                        onClick={() => handlePaginate(typePagninate.next)}
                    >
                        <FontAwesomeIcon className="text-[12px]" icon={faChevronRight} />
                    </button>
                </div>
                <span className="ml-3">Tổng số nhân viên: {staff.length}</span>
                <span className="ml-3">Tổng số trang: {totalPage}</span>
            </div>
        </section>
    );
};

export default StaffList;
