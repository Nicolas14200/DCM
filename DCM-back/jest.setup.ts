import iconv from "iconv-lite";
iconv.encodingExists("cesu8") || iconv.encodeStream("utf8", {});

