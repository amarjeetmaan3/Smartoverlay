export class SyncLockManager {
  constructor() { this.locks = new Map(); }
  acquire(path, owner) { const current = this.locks.get(path); if (current && current !== owner) return false; this.locks.set(path, owner); return true; }
  release(path, owner) { if (this.locks.get(path) === owner) this.locks.delete(path); }
  isLocked(path) { return this.locks.has(path); }
}
export default SyncLockManager;
