export class RemoteControl {
  constructor(send = () => {}) { this.send = send; }
  command(type, payload = {}) { return this.send({ type, payload, timestamp: Date.now() }); }
}
export default RemoteControl;
