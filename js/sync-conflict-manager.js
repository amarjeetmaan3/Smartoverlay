export class SyncConflictManager {
  resolve(local, remote, strategy = "remote") {
    if (strategy === "local") return local;
    if (strategy === "merge" && local && remote && typeof local === "object" && typeof remote === "object") return { ...remote, ...local };
    return remote;
  }
}
export default SyncConflictManager;
