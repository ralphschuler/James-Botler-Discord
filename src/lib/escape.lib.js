export default function escape_lib(str) {
    str = str.replace(/[\n\r]+/g, '') // clear carriage return
    str = str.replace(/\s+/g, ' ') // replace multiple spaces by a single one
    str = str.replace(/^\s+|\s+$/, '') // clear leading and trailing spaces
    str = str.replace(/^\*+|\*+$/, '') // remove stars at end and front cause we are placing
    return str
}