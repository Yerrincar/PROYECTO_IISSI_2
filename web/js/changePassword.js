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
    registerForm.onsubmit = handleSubmitPassword;
}

async function handleSubmitPassword(event) {
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
    let passwordInput = document.getElementById("input-password");
    
    try {
        currentUser = await usersAPI_auto.getById(userId);
        passwordInput.value = currentUser.password;
    } catch (err) {
        messageRenderer.showErrorAsAlert(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);