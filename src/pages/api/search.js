import searchTermsRegex from "../../lib/searchTermsRegex"
import dbConnect from '../../utils/dbConnect'
import CheckHistory from "../../models/CheckHistory";

dbConnect();

export default function handler(req, res) {
    const { method, body } = req;
    const searchQuery = searchTermsRegex(body);
    if (searchQuery.status) {
        const { dateBegin, dateEnd, disease } = searchQuery
        let searchResults = [];
        if (dateBegin && dateEnd && disease) {
            searchResults = CheckHistory.find({
                date: {
                    $gte: dateBegin,
                    $lte: dateEnd
                },
                disease_name: disease
            })
        }
        else if (dateBegin && dateEnd) {
            searchResults = CheckHistory.find({
                date: {
                    $gte: dateBegin,
                    $lte: dateEnd
                }
            })
        }
        else if (disease) {
            searchResults = CheckHistory.find({
                disease_name: disease
            })
        }
        else {
            searchResults = CheckHistory.find({})
        }
        searchResults.then(data => {
            if (data.length > 0) {
                res.status(200).json({ success: true, data: data, message: 'Berhasil mengambil data' })
            } else {
                res.status(200).json({ success: false, message: 'Data tidak ditemukan' })
            }
        }).catch(err => {
            res.status(400).json({ success: false, message: err.message })
        })
    } else {
        res.status(400).json({ success: false, message: "Kata kunci pencarian Anda kurang tepat" });
    }
}