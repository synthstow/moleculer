const NotePackSerializer = require("../../../src/serializers/notepack");
const { cloneDeep } = require("lodash");
const P = require("../../../src/packets");

describe("Test NotePackSerializer constructor", () => {
	it("should create an empty options", () => {
		let serializer = new NotePackSerializer();
		expect(serializer).toBeDefined();
		expect(serializer.serialize).toBeDefined();
		expect(serializer.deserialize).toBeDefined();
	});
});


describe("Test NotePackSerializer", () => {

	let serializer = new NotePackSerializer();
	serializer.init();

	it("should serialize the event packet", () => {
		const now = new Date();
		const obj = {
			ver: "3",
			sender: "test-1",
			event: "user.created",
			data: {
				a: 5,
				b: "Test",
				c: now
			},
			broadcast: true
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_EVENT);
		expect(s.length).toBe(79);

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
		expect(s.length).toBe(151);

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
		expect(s.length).toBe(159);

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
		expect(s.length).toBe(112);

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
		expect(s.length).toBe(94);

		const res = serializer.deserialize(s, P.PACKET_RESPONSE);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);
	});
});
