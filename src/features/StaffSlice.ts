import { createSlice } from '@reduxjs/toolkit';
import type { IStaff } from '../interfaces/NhanVien';
let initStaff: IStaff[] = [
    {
        ID: 1,
        Name: 'Lê Xuân Hiếu',
        DOB: new Date('2003-09-13'),
        Gender: 'Nam',
        Email: 'a@example.com',
        Address: 'Hà Nội',
    },
    {
        ID: 2,
        Name: 'Nguyễn Văn B',
        DOB: new Date('2003-09-14'),
        Gender: 'Nam',
        Email: 'b@example.com',
        Address: 'TP Hồ Chí Minh',
    },
    {
        ID: 3,
        Name: 'Nguyễn Văn C',
        DOB: new Date('2003-09-15'),
        Gender: 'Nam',
        Email: 'c@example.com',
        Address: 'Bắc Ninh',
    },
    {
        ID: 4,
        Name: 'Lê Văn D',
        DOB: new Date('2003-01-20'),
        Gender: 'Nam',
        Email: 'd@example.com',
        Address: 'Hải Phòng',
    },
    {
        ID: 5,
        Name: 'Nguyễn Thị E',
        DOB: new Date('2003-12-19'),
        Gender: 'Nam',
        Email: 'e@example.com',
        Address: 'Sơn La',
    },
    {
        ID: 6,
        Name: 'Nguyễn Văn F',
        DOB: new Date('2003-12-20'),
        Gender: 'Nam',
        Email: 'f@example.com',
        Address: 'Phú Thọ',
    },
    {
        ID: 7,
        Name: 'Nguyễn Văn G',
        DOB: new Date('1990-12-25'),
        Gender: 'Nam',
        Email: 'g@example.com',
        Address: 'Thanh Hóa',
    },
    {
        ID: 8,
        Name: 'Nguyễn Văn H',
        DOB: new Date('1991-01-11'),
        Gender: 'Nam',
        Email: 'h@example.com',
        Address: 'Nghệ An',
    },
    {
        ID: 9,
        Name: 'Nguyễn Văn G',
        DOB: new Date('1990-12-25'),
        Gender: 'Nam',
        Email: 'g@example.com',
        Address: 'Thanh Hóa',
    },
    {
        ID: 10,
        Name: 'Nguyễn Văn H',
        DOB: new Date('1991-01-11'),
        Gender: 'Nam',
        Email: 'h@example.com',
        Address: 'Nghệ An',
    },
];
const staffSlice = createSlice({
    name: 'staff',
    initialState: initStaff,
    reducers: {
        upsert: (state, action) => {
            if (!action.payload || !action.payload.ID) return;
            const index = state.findIndex((staff) => staff.ID === action.payload.ID);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        },
        removeStaff: (state, action) => {
            if (!action.payload || !action.payload.ID) return;
            const index = state.findIndex((staff) => staff.ID === action.payload.ID);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});
export const { upsert, removeStaff } = staffSlice.actions;
export default staffSlice.reducer;
export const getStaffById = (staff: IStaff[], id: number) => {
    return staff.find((staff) => staff.ID === id);
};
