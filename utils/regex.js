/**
 * Regexes used for validation in the form's.
 */
const Regexes = {
  longLatRegex: new RegExp('^[0-9-.]+$'),
  onlyAplhabets: /^[A-Za-z]+$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobileRegex: new RegExp('^[0-9-+]+$'),
  townAndPinRegex: new RegExp('^[a-zA-Z0-9 ]+$'),
  youtubeRegex: new RegExp(
    /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
  ),
  urlRegex: new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  ),
};

export default Regexes;
