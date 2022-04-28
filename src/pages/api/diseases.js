import dbConnect from '../../utils/dbConnect'
import Disease from '../../models/Disease'

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const diseases = await Disease.find({});
                
                res.status(200).json({ success: true, data: diseases})
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const newDisease = JSON.parse(req.body);

                const disease = await Disease.create(newDisease);

                res.status(201).json({ success: true, data: disease, message: 'Penyakit berhasil ditambahkan' });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}