import checkDNA from "../../lib/checkDNA";

export default function handler(req, res) {
    const DNA = req.body;
    const result = checkDNA(DNA);
    if (result) {
        res.status(200).json({
            message: "Valid DNA sequence",
            result: result,
            dna: DNA
        });
    }
    else {
        res.status(400).json({
            message: "Invalid DNA sequence",
            result: result,
            dna: DNA
        });
    }
}