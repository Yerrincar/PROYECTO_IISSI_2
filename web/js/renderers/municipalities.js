"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const municipalitiesRenderer = {
    asMunicipality: function(municipality) {
        let html1 = `<option value="${municipality.municipalityId}">${municipality.municipalityName}</option>`;

        let options1 = parseHTML(html1);
        return options1;
    }
}

export { municipalitiesRenderer };