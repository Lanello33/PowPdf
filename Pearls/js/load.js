   document.addEventListener("DOMContentLoaded", load);
  
   function load() {
        //replaceHead();
        replaceAml();
        replaceN();
        replaceFootnote();
        powLinks();
        replaceCopyright()
    };

    function replaceHead() {
        const metaMap = getMapFromHeadAttrs();
        const head = document.head;
        clearAllAttributes(head);
        head.innerHTML = GetheadContent();
        UpdateMeta(head, metaMap);
    }

   function replaceAml() {
        document.querySelectorAll("Aml").forEach(aml => {
            const i = aml.getAttribute("i");
            const N = `<N><a id=n${i} href="#a${i}">[${i}]</a></N>`;
            aml.outerHTML = `<Aml><a href="https://ascendedmasterlibrary.org/" target="_blank">Ascended Master Library</a></Aml>`;
        });
    }

    function replaceFootnote() {
        document.querySelectorAll("Footnote").forEach(footnote => {
            const i = footnote.getAttribute("i");
            const c = footnote.innerHTML;
            footnote.outerHTML = `<Footnote><a id="a${i}" href="#n${i}">${i}.</a> ${c}</Footnote>`;
        });
    }

    function replaceN() {
        document.querySelectorAll("N").forEach(n => {
            const i = n.getAttribute("i");
            const N = `<N><a id=n${i} href="#a${i}">[${i}]</a></N>`;
            n.outerHTML = N;
        });
    }

    function XreplaceFootnote() {
        document.querySelectorAll("Footnote").forEach(footnote => {
            const i = footnote.getAttribute("i");
            const contents = footnote.innerHTML;
            footnote.outerHTML = `<Footnote><a id="a${i}" href="#n${i}" class="footnote">${i}.</a> ${contents}</N>`;
        });
    }

    function getMapFromHeadAttrs() {
        const head = document.head;
        const metaMap = new Map();
        for (const attr of head.attributes) {
            if (attr.name && attr.value) {
                metaMap.set(attr.name, attr.value);
            }
        }
        return metaMap;
    }

    function clearAllAttributes(tag) {
        while (tag.firstChild) {
            tag.removeChild(tag.firstChild);
        }
        const attrs = Array.from(tag.attributes);
        for (const attr of attrs) {
            tag.removeAttribute(attr.name);
        }
    }

    function UpdateMeta(head, metaMap) {
        metaMap.forEach((value, key) => {
            if (key === "title") {
                let title = head.querySelector("title");
                if (title) {
                    title.textContent = value;
                }
            } else {
                let meta = head.querySelector(`meta[name="${key}"], meta[property="${key}"]`);
                if (meta) {
                    meta.setAttribute("content", value);
                } else {
                    const newMeta = document.createElement("meta");
                    newMeta.setAttribute("name", key);
                    newMeta.setAttribute("content", value);
                    head.appendChild(newMeta);
                }
            }
        });
        return head.outerHTML;
    }

    function powLinks() {
        // <pow ref="n="1">...</pow>
        document.querySelectorAll("pow").forEach(link => {
            const vol = link.getAttribute("vol");
            const no = link.getAttribute("no");
            const contents = link.innerHTML;
            const href = getPowLink(vol, no);
            link.outerHTML = `<a href="${href}" target="_blank">Vol. ${vol} No. ${no}  ${contents}</a>`;
        });
    }

    function getPowLink(vol, no) {
        return `https://pearls.tsl.org/${vol}/${no}`;
        //const year = parseInt(vol) - 1958 + 1;
        // 2021pows/PW210608MC.html
        //const name = `pw${year}{}`;
        //const href = `https://pearls.tsl.org/${year}pows/${name}.html`;
    }

    function GetheadContent() {
// <link rel="stylesheet" href="../pearls.css" type="text/css" media="screen" />
// <link rel="stylesheet" href="../print.css" type="text/css" media="print" />

        return `
<meta charset="utf-8" />
<title></title>
<meta name="volume" content="" />
<meta name="number" content="1" />
<meta name="date" content="" />
<meta name="eventdate" content="" />
<meta name="author" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="pow.css" type="text/css"/>
<script type="text/javascript" src="../highlight.js"></script>
`
.replace("#script", "script");
    }

    function getCopyright() {
        return `
<hr>
<p class="copyright"><a href="../legal_notices/copyright.html?pearls" target="_blank">Terms of Use</a></p>
<p class="copyright">Copyright © 2021 The Summit Lighthouse, Inc. All rights reserved.</p>
<p class="copyright"><em>Pearls  of Wisdom</em><sup>&reg;</sup>
    , the <em>Pearls of Wisdom</em><sup>&reg;</sup> masthead,
    Keepers of the Flame<sup>&reg;</sup>,
    The Summit Lighthouse<sup>&reg;</sup> and The Summit  Lighthouse<sup>®;</sup>
    logo are trademarks registered in the United States Patent and Trademark Office
    and in other countries. All rights to their use are reserved.
</p>`
    }

    function replaceCopyright() {

        let cr = document.querySelector("Copyright");
        let c = getCopyright();
        cr.outerHTML = c;
    }
