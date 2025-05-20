import { describe, it, expect } from 'vitest';
import WebSocket from 'ws';

describe('WebSocket clients test', () => {
  it('should receive message on cli1 when cli2 sends', (done) => {
    const cli1 = new WebSocket('ws://127.0.0.1:8080');
    const cli2 = new WebSocket('ws://127.0.0.1:8080');
    const MESSAGE = 'MESSAGE11111';

    // Wait for both clients to open before testing
    let openCount = 0;
    function tryRun() {
      if (cli1.readyState === WebSocket.OPEN && cli2.readyState === WebSocket.OPEN) {
        cli1.on('message', (msg) => {
          expect(msg.toString()).toBe(MESSAGE);
          done(); // Test done when message received
        });
        cli2.send(MESSAGE);
      }
    }

    cli1.on('open', () => {
      openCount++;
      if (openCount === 2) tryRun();
    });
    cli2.on('open', () => {
      openCount++;
      if (openCount === 2) tryRun();
    });
  });
});
