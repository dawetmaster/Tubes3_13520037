export default function searchTermsRegex(string) {
    const diseaseOnlyPattern = /^\s*(\b[0-9a-zA-Z\-\s\']+\b)\s*$/
    const dateAndMonthAndYearPattern = /^\s*(\d{1,2})\s*(\bJanuari\b|\bFebruari\b|\bMaret\b|\bApril\b|\bMei\b|\bJuni\b|\bJuli\b|\bAgustus\b|\bSeptember\b|\bOktober\b|\bNovember\b|\bDesember\b)\s*(\d{4})\s*$/
    const ddMMyyyySlashPattern = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/
    const ddMMyyyyHyphenPattern = /^\s*(\d{1,2})\-(\d{1,2})\-(\d{4})\s*$/
    const dateAndMonthAndYearAndDiseasePattern = /^\s*(\d{1,2})\s*(\bJanuari\b|\bFebruari\b|\bMaret\b|\bApril\b|\bMei\b|\bJuni\b|\bJuli\b|\bAgustus\b|\bSeptember\b|\bOktober\b|\bNovember\b|\bDesember\b)\s*(\d{4})\s*(\b[0-9a-zA-Z\-\s\']+\b)\s*$/
    const ddMMyyyySlashAndDiseasePattern = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*(\b[0-9a-zA-Z\-\s\']+\b)\s*$/
    const ddMMyyyyHyphenAndDiseasePattern = /^\s*(\d{1,2})\-(\d{1,2})\-(\d{4})\s*(\b[0-9a-zA-Z\-\s\']+\b)\s*$/

    if (string.match(dateAndMonthAndYearAndDiseasePattern)) {
        let date = string.match(dateAndMonthAndYearAndDiseasePattern)[1]
        let month = string.match(dateAndMonthAndYearAndDiseasePattern)[2]
        const year = string.match(dateAndMonthAndYearAndDiseasePattern)[3]
        const disease = string.match(dateAndMonthAndYearAndDiseasePattern)[4]
        if (month === 'Januari') {
            month = '00'
        } else if (month === 'Februari') {
            month = '01'
        } else if (month === 'Maret') {
            month = '02'
        } else if (month === 'April') {
            month = '03'
        } else if (month === 'Mei') {
            month = '04'
        } else if (month === 'Juni') {
            month = '05'
        } else if (month === 'Juli') {
            month = '06'
        } else if (month === 'Agustus') {
            month = '07'
        } else if (month === 'September') {
            month = '08'
        } else if (month === 'Oktober') {
            month = '09'
        } else if (month === 'November') {
            month = '10'
        } else if (month === 'Desember') {
            month = '11'
        }

        const dateBegin = new Date(year, month, date);
        const dateEnd = new Date(year, month, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: disease
        }
    }
    if (string.match(ddMMyyyySlashAndDiseasePattern)) {
        let date = string.match(ddMMyyyySlashAndDiseasePattern)[1]
        let month = string.match(ddMMyyyySlashAndDiseasePattern)[2]
        const year = string.match(ddMMyyyySlashAndDiseasePattern)[3]
        const disease = string.match(ddMMyyyySlashAndDiseasePattern)[4]

        const dateBegin = new Date(year, Number(month) - 1, date);
        const dateEnd = new Date(year, Number(month) - 1, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: disease
        }
    }
    if (string.match(ddMMyyyyHyphenAndDiseasePattern)) {
        let date = string.match(ddMMyyyyHyphenAndDiseasePattern)[1]
        let month = string.match(ddMMyyyyHyphenAndDiseasePattern)[2]
        const year = string.match(ddMMyyyyHyphenAndDiseasePattern)[3]
        const disease = string.match(ddMMyyyyHyphenAndDiseasePattern)[4]

        const dateBegin = new Date(year, Number(month) - 1, date);
        const dateEnd = new Date(year, Number(month) - 1, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: disease
        }
    }
    if (string.match(dateAndMonthAndYearPattern)) {
        let date = string.match(dateAndMonthAndYearPattern)[1]
        let month = string.match(dateAndMonthAndYearPattern)[2]
        const year = string.match(dateAndMonthAndYearPattern)[3]

        if (month === 'Januari') {
            month = '00'
        } else if (month === 'Februari') {
            month = '01'
        } else if (month === 'Maret') {
            month = '02'
        } else if (month === 'April') {
            month = '03'
        } else if (month === 'Mei') {
            month = '04'
        } else if (month === 'Juni') {
            month = '05'
        } else if (month === 'Juli') {
            month = '06'
        } else if (month === 'Agustus') {
            month = '07'
        } else if (month === 'September') {
            month = '08'
        } else if (month === 'Oktober') {
            month = '09'
        } else if (month === 'November') {
            month = '10'
        } else if (month === 'Desember') {
            month = '11'
        }

        const dateBegin = new Date(year, month, date);
        const dateEnd = new Date(year, month, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: ''
        }
    }
    if (string.match(ddMMyyyySlashPattern)) {
        let date = string.match(ddMMyyyySlashPattern)[1]
        let month = string.match(ddMMyyyySlashPattern)[2]
        const year = string.match(ddMMyyyySlashPattern)[3]

        const dateBegin = new Date(year, Number(month) - 1, date);
        const dateEnd = new Date(year, Number(month) - 1, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: ''
        }
    }
    if (string.match(ddMMyyyyHyphenPattern)) {
        let date = string.match(ddMMyyyyHyphenPattern)[1]
        let month = string.match(ddMMyyyyHyphenPattern)[2]
        const year = string.match(ddMMyyyyHyphenPattern)[3]

        const dateBegin = new Date(year, Number(month) - 1, date);
        const dateEnd = new Date(year, Number(month) - 1, Number(date) + 1);

        return {
            status: true,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            disease: ''
        }
    }
    if (string.match(diseaseOnlyPattern)) {
        const disease = string.match(diseaseOnlyPattern)[1]

        return {
            status: true,
            dateBegin: '',
            dateEnd: '',
            disease: disease
        }
    }
    return {
        status: false,
        dateBegin: '',
        dateEnd: '',
        disease: ''
    }
}