"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const descriptionRenderer = {
    asBio: function(users) {
        let html = `<div class="card bg-dark text-light">
                        ${users.bio}
                    </div>`;

        let card = parseHTML(html);
        return card;
    }
}

export { descriptionRenderer };