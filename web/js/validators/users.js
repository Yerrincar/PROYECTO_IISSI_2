"use strict";

const userValidator = {

    validateRegister: function (formData) {
        let errors = [];

        let username = formData.get("username");
        let password = formData.get("password");
        let password1 = formData.get("password1");
        let dateOfBirth = formData.get("dateOfBirth");
        let postCode = formData.get("postcode");

        if (username.length < 3) {
            errors.push("The username should have more than 3 characters");
        }

        if (password !== password1) {
            errors.push("The passwords must match");
        }

        let edad = calcularEdad(dateOfBirth);
        
        if (edad < 18) {
            errors.push("You must be of legal age");
        }

        if(edad > 122) {
            errors.push("Write a validate date");
        }


        if(postCode > 99999 || postCode < 10000) {
            errors.push("Write a validate postal code");   
        }

        return errors;
    }
};

function calcularEdad(fecha_nacimiento) {
    let hoy = new Date();
    let cumpleanos = new Date(fecha_nacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        
        if (m < 0 || (m === 0 && hoy.getDay() < cumpleanos.getDay())) {
            edad--;
        }
    
    return edad;
    }
}

export { userValidator };