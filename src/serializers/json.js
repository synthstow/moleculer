/*
 * moleculer
 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer)
 * MIT Licensed
 */

"use strict";

const BaseSerializer  	= require("./base");
const P 				= require("../packets");

/**
 * JSON serializer for Moleculer
 *
 * @class JSONSerializer
 */
class JSONSerializer extends BaseSerializer {

	/**
	 * Creates an instance of JSONSerializer.
	 *
	 * @memberof JSONSerializer
	 */
	constructor() {
		super();
	}

	/**
	 * Serializer a JS object to Buffer
	 *
	 * @param {Object} obj
	 * @param {String} type of packet
	 * @returns {Buffer}
	 *
	 * @memberof Serializer
	 */
	serialize(obj) {
		return Buffer.from(JSON.stringify(obj));
	}

	/**
	 * Deserialize Buffer to JS object
	 *
	 * @param {Buffer} buf
	 * @param {String} type of packet
	 * @returns {Object}
	 *
	 * @memberof Serializer
	 */
	deserialize(buf, type) {
		const obj = JSON.parse(buf);

		switch(type) {
			case P.PACKET_EVENT: {
				if (this.isJSONBuffer(obj.data))
					obj.data = Buffer.from(obj.data);
				break;
			}
			case P.PACKET_REQUEST: {
				if (this.isJSONBuffer(obj.params))
					obj.params = Buffer.from(obj.params);
				break;
			}
			case P.PACKET_RESPONSE: {
				if (this.isJSONBuffer(obj.data))
					obj.data = Buffer.from(obj.data);
				break;
			}
		}

		return obj;
	}
}

module.exports = JSONSerializer;
