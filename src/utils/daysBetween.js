export function daysBetween(startDate, endDate) {
    // Chuyển chuỗi thành đối tượng Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Tính số milliseconds giữa hai ngày
    const timeDifference = endDateObj - startDateObj;

    // Chuyển milliseconds thành số ngày
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.abs(daysDifference + 1); // Trả về giá trị tuyệt đối để đảm bảo kết quả không bị âm (nếu ngày bắt đầu sau ngày kết thúc)
}
