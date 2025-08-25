import dayjs from 'dayjs';

export const formatDate = (date: any) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
};
export const isOver18 = (dobString: Date) => {
    const dob = dayjs(dobString); // ví dụ "2007-08-25"
    const today = dayjs();

    // nếu ngày sinh trước hoặc bằng ngày hiện tại - 18 năm → đủ 18
    return dob.isBefore(today.subtract(18, 'year')) || dob.isSame(today.subtract(18, 'year'), 'day');
};
