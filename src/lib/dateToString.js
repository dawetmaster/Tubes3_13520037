export default function dateToString(date) {
    // convert date to indonesian format string
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateString = `${day} ${month} ${year}`;
    return dateString;
}