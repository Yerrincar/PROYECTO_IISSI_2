"use strict";

import { provincesAPI_auto } from "/js/api/_provinces.js";
import { selectRenderer } from "/js/renderers/select.js";

import { municipalitiesAPI_auto } from "/js/api/_municipalities.js";
import { select1Renderer } from "/js/renderers/selects1.js";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";

function main() {
    loadAllProvinces();
    loadAllMunicipalities();

    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

async function loadAllProvinces() {
    let provincesSelect = document.getElementById("provinceSelectDiv");

    try {
        let provinces = await provincesAPI_auto.getAll();
        let options = selectRenderer.asSelect(provinces);
        provincesSelect.appendChild(options);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error while loading provinces", err);
    }
}

async function loadAllMunicipalities() {
    let municipalitiesSelect = document.getElementById("municipalitySelectDiv");

    try {
        let municipalities = await municipalitiesAPI_auto.getAll();
        let options1 = select1Renderer.asSelect1(municipalities);
        municipalitiesSelect.appendChild(options1);
    } catch (err) {
        messageRenderer.showErrorAsAlert("Error while loading municipalities", err);
    }
}

function handleSubmitRegister(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errors = userValidator.validateRegister(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorAsAlert(error);
        }
    } else {
        sendRegister(formData);
    }
}

async function sendRegister(formData){
    try{
        let loginData = await authAPI.register(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;

        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
    } catch(err){
        messageRenderer.showErrorAsAlert("Error registering a new user", err);
    }
}

document.addEventListener("DOMContentLoaded", main);