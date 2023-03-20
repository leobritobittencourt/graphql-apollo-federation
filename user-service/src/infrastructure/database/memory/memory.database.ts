interface MemoryDatabaseInterface {
  users: any[];
}

export class MemoryDatabaseService {
  private static instance: MemoryDatabaseService;

  private constructor(readonly database: MemoryDatabaseInterface = { users: [] }) {
    this.database.users = [];
  }

  static getInstance(): MemoryDatabaseService {
    if (!MemoryDatabaseService.instance) {
      MemoryDatabaseService.instance = new MemoryDatabaseService();
    }
    return MemoryDatabaseService.instance;
  }
}
