class Container {
    private dependencies = new Map<string, any>();
  
    register<T>(key: string, instance: T) {
      this.dependencies.set(key, instance);
    }
  
    resolve<T>(key: string): T {
      const instance = this.dependencies.get(key);
      if (!instance) {
        throw new Error(`No dependency found for key: ${key}`);
      }
      return instance;
    }
  }
  

export const container = new Container();
