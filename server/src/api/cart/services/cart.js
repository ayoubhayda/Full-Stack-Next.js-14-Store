'use strict';

/**
 * cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cart.cart');
