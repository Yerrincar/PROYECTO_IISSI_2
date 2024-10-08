/*
 * DO NOT EDIT THIS FILE, it is auto-generated. It will be updated automatically.
 * All changes done to this file will be lost upon re-running the 'silence createapi' command.
 * If you want to create new API methods, define them in a new file.
 *
 * Silence is built and maintained by the DEAL research group at the University of Seville.
 * You can find us at https://deal.us.es
 */

"use strict";

import { BASE_URL, requestOptions } from './common.js';

const municipalitiesAPI_auto = {

    /**
    * Gets all municipalities
    */
    getAll: async function(formData) {
        let response = await axios.get(`${BASE_URL}/municipalities`, requestOptions);
        return response.data;
    },

    /**
    * Gets an entry from 'municipalities' by its primary key
    */
    getById: async function(municipalityId) {
        let response = await axios.get(`${BASE_URL}/municipalities/${municipalityId}`, requestOptions);
        return response.data[0];
    },

    /**
    * Creates a new entry in 'municipalities'
    */
    create: async function(formData) {
        let response = await axios.post(`${BASE_URL}/municipalities`, formData, requestOptions);
        return response.data;
    },

    /**
    * Updates an existing entry in 'municipalities' by its primary key
    */
    update: async function(formData, municipalityId) {
        let response = await axios.put(`${BASE_URL}/municipalities/${municipalityId}`, formData, requestOptions);
        return response.data;
    },

    /**
    * Deletes an existing entry in 'municipalities' by its primary key
    */
    delete: async function(municipalityId) {
        let response = await axios.delete(`${BASE_URL}/municipalities/${municipalityId}`, requestOptions);
        return response.data;
    },
};

export {municipalitiesAPI_auto};