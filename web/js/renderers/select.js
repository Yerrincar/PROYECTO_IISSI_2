"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { provincesRenderer } from "/js/renderers/provinces.js";

const selectRenderer = {
    asSelect: function (provinces) {
        let selects = parseHTML('<select name="provinceId" id="provinceSelect" onchange="cambia_municipio()"></select>');
        let jp = parseHTML('<option value="">Enter your province here before select municipality</option>');
        selects.appendChild(jp);
        
        for (let province of provinces) {
            let options = provincesRenderer.asProvince(province);
            selects.appendChild(options);
        }

        return selects;
    }
}

export { selectRenderer };