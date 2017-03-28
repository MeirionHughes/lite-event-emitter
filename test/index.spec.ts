import { assert, expect } from 'chai';
import { LiteEventEmitter } from '../src/index';

describe("LiteEventEmitter", () => {
  it("can emit without error", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });
    event.emit("foo", 1, 2, 3, 4);
    expect(called).to.be.eq(1);
    event.emit("foo", 1, 2, 3, 4);
    expect(called).to.be.eq(2);
  });

  it("does not call 'on' subscriptions with different event name", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.on("foo", (...args) => {
      called++;
    });
    event.emit("bar", 1, 2, 3, 4);
    expect(called).to.be.eq(0);
  });

  it("does not call 'once' subscriptions with different event name", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.once("foo", (...args) => {
      called++;
    });
    event.emit("bar", 1, 2, 3, 4);
    expect(called).to.be.eq(0);
  });

  it("can emit and call on subscription without error", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called += 1;
    });
    event.emit("foo", 1, 2, 3, 4);
    expect(called).to.be.eq(1);
  });

  it("can emit and call multiple subscriptions without error", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });
    event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });
    event.emit("foo", 1, 2, 3, 4);
    expect(called).to.be.eq(2);
  });

  it("does not call on subscription after dispose", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    let dispose = event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });

    event.emit("foo", 1, 2, 3, 4);
    dispose();
    event.emit("foo", 1, 2, 3, 4);

    expect(called).to.be.eq(1);
  });

  it("does not call once subscription more than once", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    event.once("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });

    event.emit("foo", 1, 2, 3, 4);
    event.emit("foo", 1, 2, 3, 4);

    expect(called).to.be.eq(1);
  });

  it("does not call once subscription if disposed before emit", () => {
    let event = new LiteEventEmitter();
    let called = 0;
    let dispose = event.once("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });

    dispose();
    event.emit("foo", 1, 2, 3, 4);
    expect(called).to.be.eq(0);
  });

  it("dipsose on subscription twice without error ", () => {
    let event = new LiteEventEmitter();

    let dispose = event.on("foo", (...args) => { });

    dispose();
    dispose();
  });


  it("dipsose once subscription twice without error ", () => {
    let event = new LiteEventEmitter();

    let dispose = event.once("foo", (...args) => { });

    dispose();
    dispose();
  });

  it("can emit event without subscribers", () => {
    let event = new LiteEventEmitter();
    event.emit("foo", "bar");
  });

  it("can emit event without args", () => {
    let event = new LiteEventEmitter();
    event.emit("foo");
  });

  it("can emit after all subscribers removed", () => {
    let event = new LiteEventEmitter();
    event.on("foo", () => { })();
    event.emit("foo", "bar");
  });

  it("does call subscription after earlier subscription is disposed", () => {
    let event = new LiteEventEmitter();
    let called = 0;

    let dispose = event.on("foo", (...args) => {
      called++;
    });

    event.on("foo", (...args) => {
      expect(args).to.deep.eq([1, 2, 3, 4]);
      called++;
    });

    dispose();

    event.emit("foo", 1, 2, 3, 4);

    expect(called).to.be.eq(1);
  });


});