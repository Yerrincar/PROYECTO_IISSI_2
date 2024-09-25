"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const provincesRenderer = {
    asProvince: function(province) {
        let html = `<option value="${province.provinceId}">${province.provinceName}</option>`;

        let options = parseHTML(html);
        return options;
    },
}

export { provincesRenderer };