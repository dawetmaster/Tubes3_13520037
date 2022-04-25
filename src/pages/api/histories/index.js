import dbConnect from '../../../utils/dbConnect'
import CheckHistory from '../../../models/CheckHistory'

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const histories = await CheckHistory.find({});
                
                res.status(200).json({ success: true, data: histories})
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const history = await CheckHistory.create(req.body);

                res.status(201).json({ success: true, data: history });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}