import matchingWithBM from "../../lib/stringmatchingBM";
import matchingWithKMP from "../../lib/stringmatchingKMP";
import lccs from "../../lib/dnaSimilarity";
import dbConnect from '../../utils/dbConnect'
import Disease from '../../models/Disease'
import dateToString from '../../lib/dateToString'

dbConnect();

export default async function handler(req, res) {
    try {
        const textData = JSON.parse(req.body);
        const diseaseData = await Disease.findOne({name: textData.disease})

        const similarityValue = lccs(textData.dna, diseaseData.dna);
        let similarityStatus;
        var startTime = new Date();
        if (textData.method === 'KMP') {
            similarityStatus = matchingWithKMP(textData.dna, diseaseData.dna);
        }
        else {
            similarityStatus = matchingWithBM(textData.dna, diseaseData.dna);
        }
        var endTime = new Date();
        const timeDiff = endTime - startTime;

        const today = new Date();
        const data = {
            date: today,
            patient_name: textData.name,
            disease_name: textData.disease,
            similarity: similarityValue,
            result: similarityStatus
        }

        const message = "Hasil prediksi penyakit Anda: " +
            dateToString(today) + " - " +
            textData.name + " - " +
            textData.disease + " - " +
            similarityValue + "% - " +
            similarityStatus + ". Waktu eksekusi adalah " +
            timeDiff + " miliseconds";

        res.status(200).json({
            success: true,
            data: data,
            message: message
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}