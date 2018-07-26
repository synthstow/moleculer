const { cloneDeep } = require("lodash");
const P = require("../../../src/packets");
const JSONSerializer = require("../../../src/serializers/json");


describe("Test JSONSerializer constructor", () => {
	it("should create an empty options", () => {
		let serializer = new JSONSerializer();
		expect(serializer).toBeDefined();
		expect(serializer.serialize).toBeDefined();
		expect(serializer.deserialize).toBeDefined();
	});
});

describe("Test JSONSerializer", () => {

	let serializer = new JSONSerializer();
	serializer.init();

	it("should serialize the event packet", () => {
		const obj = {
			ver: "3",
			sender: "test-1",
			event: "user.created",
			data: {
				a: 5,
				b: "Test"
			},
			broadcast: true
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_EVENT);
		expect(s.length).toBe(95);

		const res = serializer.deserialize(s, P.PACKET_EVENT);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});

	it("should serialize the request packet", () => {
		const obj = {
			ver: "3",
			sender: "test-1",
			id: "100",
			action: "posts.find",
			params: { id: 5 },
			meta: {
				user: {
					id: 1,
					roles: [ "admin" ]
				}
			},
			timeout: 1500,
			level: 4,
			metrics: true,
			parentID: "999",
			requestID: "12345",
			stream: false
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_REQUEST);
		expect(s.length).toBe(215);

		const res = serializer.deserialize(s, P.PACKET_REQUEST);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});

	it("should serialize the request packet with buffer", () => {
		const obj = {
			ver: "3",
			sender: "test-1",
			id: "100",
			action: "posts.find",
			params: Buffer.from("binary data"),
			meta: {
				user: {
					id: 1,
					roles: [ "admin" ]
				}
			},
			timeout: 1500,
			level: 4,
			metrics: true,
			parentID: "999",
			requestID: "12345",
			stream: false
		};

		const s = serializer.serialize(cloneDeep(obj), P.PACKET_REQUEST);
		expect(s.length).toBe(272);

		const res = serializer.deserialize(s, P.PACKET_REQUEST);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});

	it("should serialize the response packet with data", () => {
		const obj = {
			ver: "3",
			sender: "test-1",
			id: "12345",
			success: true,
			data: [
				{ id: 1, name: "John" },
				{ id: 2, name: "Jane" }
			],
			meta: {
				user: {
					id: 1,
					roles: [ "admin" ]
				}
			},
			stream: false
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_RESPONSE);
		expect(s.length).toBe(170);

		const res = serializer.deserialize(s, P.PACKET_RESPONSE);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});

	it("should serialize the response packet with buffer data", () => {
		const obj = {
			ver: "3",
			sender: "test-1",
			id: "12345",
			success: true,
			data: Buffer.from("binary data"),
			meta: {
				user: {
					id: 1,
					roles: [ "admin" ]
				}
			},
			stream: false
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_RESPONSE);
		expect(s.length).toBe(188);

		const res = serializer.deserialize(s, P.PACKET_RESPONSE);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});

});
