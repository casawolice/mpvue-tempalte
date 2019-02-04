export default function(obj) {
    let rs = "";
    for (var prop in obj) {
        obj.hasOwnProperty(prop) ? rs += `&${prop}=${encodeURIComponent( obj[prop])}` : "";

    }
    return rs.substr(1);

}