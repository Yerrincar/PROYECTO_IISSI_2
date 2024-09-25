"use strict";

import { picturesAPI_auto } from "/js/api/_pictures.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { usersAPI_auto } from "/js/api/_users.js";
import { sessionManager } from "/js/utils/session.js";
import { descriptionRenderer } from "/js/renderers/description.js";

async function main() {
    loadAllPhotos();
    showUser();
    loadDescription();
}

function showUser() {
    let title = document.getElementById("userProfile");

    title.textContent = sessionManager.getLoggedUser().username;
}

async function loadAllPhotos() {
    let galleryContainer = document.getElementById("fotitos");

    try {
        let photos = await picturesAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(cardGallery);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error while loading photos", err);
    }
}

async function loadDescription() {
    let descriptionContainer = document.getElementById("descriptionId");

    try {
        let userId = sessionManager.getLoggedId();
        let description = await usersAPI_auto.getById(userId);
        let cardDescription = descriptionRenderer.asBio(description);
        descriptionContainer.appendChild(cardDescription);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error while loading bio", err);
    }
}

document.addEventListener("DOMContentLoaded", main);