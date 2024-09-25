"use strict";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main(){
    let usernameBtn = document.querySelector("#btn-username");
    usernameBtn.onclick = handleUsername;

    let bioBtn = document.querySelector("#btn-bio");
    bioBtn.onclick = handleBio;

    let passwordBtn = document.querySelector("#btn-password");
    passwordBtn.onclick = handlePassword;
}

function handleUsername(event) {
    window.location.href = "changeUsername.html?userId=" + userId;
}

function handleBio(event) {
    window.location.href = "changeBio.html?userId=" + userId;
}

function handlePassword(event) {
    window.location.href = "changePassword.html?userId=" + userId;
}

document.addEventListener("DOMContentLoaded", main);