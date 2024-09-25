"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { picturesAPI_auto } from "/js/api/_pictures.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

// Get the ID of the photo to load from the URL params
let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function main() {
    // Check that we have an ID before doing anything else
    if (photoId === null) {
        messageRenderer.showErrorAsAlert("Please, provide a photoId");
        return;
    }

    // Assign the handler function to the delete button
    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;


    loadPhotoDetailsHeader();
    loadPhotoDetailsColumn();
    hideActionsColumn();
}

async function loadPhotoDetailsHeader() {
    let photoContainer = document.querySelector("#photo-details-header");
    
    try {
        let photo = await picturesAPI_auto.getById(photoId)
        let photoDetailsHeader = photoRenderer.asPhotoDetailsHeader(photo);
        photoContainer.appendChild(photoDetailsHeader);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error loading photo details", err);
    }
}

async function loadPhotoDetailsColumn() {
    let photoContainer = document.querySelector("#photo-details-column");
    
    try {
        let photo = await picturesAPI_auto.getById(photoId)
        let photoDetailsColumn = photoRenderer.asPhotoDetailsColumn(photo);
        photoContainer.appendChild(photoDetailsColumn);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error loading photo", err);
    }
}

async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo?");
    
    if (answer) {
        try {
            await picturesAPI_auto.delete(photoId);
            window.location = "/profile.html";
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }
}

function handleEdit(event) {
    window.location.href = "editPhoto.html?photoId=" + photoId;
}

function hideActionsColumn() {
    let actions_col = document.getElementById("actions-col");
    
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);