// string sanitizer
// sanitizes string from newline, spaces, and tabs

export default function sanitizeString(str) {
    return str.replace(/\n/g, '').replace(/\s/g, '').replace(/\t/g, '');
}