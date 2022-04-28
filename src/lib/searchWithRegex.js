import CheckHistory from "../models/CheckHistory";
import dbConnect from "../utils/dbConnect"

dbConnect();

function search(searchKey) {
    var result;
    // Search with disease only
    if (parseInt(searchKey.charAt(0)) == NaN) {
        result = CheckHistory.find({disease_name: {$regex: searchKey}});
        // Search with date only
    } else if (array.length == 3) {
        result = CheckHistory.find({date: {$regex: searchKey}});
    } else {
        let array = searchKey.split(" ");
        let date_pattern = array[0] + " " + array[1] + " " + array[2];
        var disease_pattern = array[3];
        
        for (let i = 4; i < array.length; i++) {
            disease_pattern += " " + array[i];
        } 

        result = CheckHistory.find({date: {$regex: date_pattern}, disease_name: {$regex: disease_pattern}});
    }
    return result;
}

export default search;