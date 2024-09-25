"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { municipalitiesRenderer } from "/js/renderers/municipalities.js";

const select1Renderer = {
    asSelect1: function (municipalities) {
        let selects1 = parseHTML('<select name="municipalityId" id="municipalitySelect"></select>');
        let jp = parseHTML('<option value="">-----</option>');
        selects1.appendChild(jp);
        
        for (let municipality of municipalities) {
            let options1 = municipalitiesRenderer.asMunicipality(municipality);
            selects1.appendChild(options1);
        }

        return selects1;
    }
}

export { select1Renderer };