import dbConnect from '../../utils/dbConnect'
import CheckHistory from '../../models/CheckHistory'
import dateToString from '../../lib/dateToString';

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    switch(method) {
        case 'GET':
            try {
                const histories = await CheckHistory.find({});
                
                res.status(200).json({ success: true, data: histories, message: 'Berhasil mengambil data'})
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        case 'POST':
            try {
                let tmp = await JSON.parse(body);
                const data = {
                    date: new Date(tmp.date),
                    patient_name: String(tmp.patient_name),
                    disease_name: String(tmp.disease_name),
                    similarity: String(tmp.similarity),
                    result: Boolean(tmp.result)
                }
                console.log(data);
                const history = await CheckHistory.create(data);
                const msg = 'Berhasil menambahkan data :' + 
                    dateToString(data.date) + ' - ' +
                    data.patient_name + ' - ' +
                    data.disease_name + ' - ' +
                    Number(data.similarity).toFixed(2) + '% - ' +
                    data.result;
                
                res.status(201).json({ success: true, data: history, message: msg });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false, message: 'Method not allowed' });
            break;
    }
}