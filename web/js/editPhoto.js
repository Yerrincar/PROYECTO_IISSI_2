"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { picturesAPI_auto } from "/js/api/_pictures.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

async function main() {
    if (photoId !== null) {
        loadCurrentPhoto();
    }

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;
}

async function handleSubmitPhoto(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);
    
    if (currentPhoto === null) { // Creating a new photo
        // Add the current user ID
        formData.append("userId", sessionManager.getLoggedId());
    
        try {
            let resp = await picturesAPI_auto.create(formData);
            let newId = resp.lastId;
            window.location.href = `photo_details.html?photoId=${newId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    } else { // Updating an existing photo
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);
        
        try {
            await picturesAPI_auto.update(formData, photoId);
            window.location.href = `photo_details.html?photoId=${photoId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }
}

async function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    
    document.title = "Edit photo";
    pageTitle.textContent = "Edit photo";
    
    try {
        currentPhoto = await picturesAPI_auto.getById(photoId);
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
    } catch (err) {
        messageRenderer.showErrorAsAlert(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);