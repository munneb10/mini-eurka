interface ServiceInstance {
  id: string;
  name: string;
  host: string;
  port: number;
  lastHeartbeat: number;
}

export class ServiceRegistry {
  private services: Record<string, ServiceInstance[]> = {};
  private timeout = 10000; // 10 seconds

  register(instance: ServiceInstance) {
    if (!this.services[instance.name]) {
      this.services[instance.name] = [];
    }

    const existing = this.services[instance.name].find(s => s.id === instance.id);
    if (existing) {
      existing.lastHeartbeat = Date.now();
    } else {
      this.services[instance.name].push(instance);
    }
  }

  heartbeat(serviceName: string, id: string) {
    const instance = this.services[serviceName]?.find(s => s.id === id);
    if (instance) {
      instance.lastHeartbeat = Date.now();
      return true;
    }
    return false;
  }

  getService(name: string) {
    this.cleanup();
    const instances = this.services[name] || [];
    return instances[Math.floor(Math.random() * instances.length)];
  }

  cleanup() {
    const now = Date.now();
    for (const [name, instances] of Object.entries(this.services)) {
      this.services[name] = instances.filter(
        s => now - s.lastHeartbeat < this.timeout
      );
    }
  }
}
