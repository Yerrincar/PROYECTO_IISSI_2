"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { usersAPI_auto } from "/js/api/_users.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
let currentUser = null;

async function main() {
    loadCurrentUser();

    let registerForm = document.getElementById("form-username-upload");
    registerForm.onsubmit = handleSubmitBio;
}

async function handleSubmitBio(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", currentUser.userId);

    try {
        await usersAPI_auto.update(formData, userId);
        window.location.href = `profile.html`;
    } catch (err) {
        messageRenderer.showErrorAsAlert(err.response.data.message);
    }
}

async function loadCurrentUser() {
    let bio = document.getElementById("input-bio");
    
    try {
        currentUser = await usersAPI_auto.getById(userId);
        bioInput.value = currentUser.bio;
    } catch (err) {
        messageRenderer.showErrorAsAlert(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);