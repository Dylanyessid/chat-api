// Dependency injection container class
class Container {
    private dependencies = new Map<string, any>();

    // Register a dependency
    register<T>(key: string, instance: T) {
        this.dependencies.set(key, instance);
    }

    // Resolve a dependency
    resolve<T>(key: string): T {
        const instance = this.dependencies.get(key);
        if (!instance) {
            throw new Error(`No dependency found for key: ${key}`);
        }
        return instance;
    }
}

// Export the container instance
export const container = new Container();
