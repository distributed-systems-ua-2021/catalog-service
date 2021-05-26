import { ConfigurationListener } from '../services/CatalogService'

export type CatalogServiceConfiguration = {
  readonly leader: string
  readonly isLeader: boolean
  readonly ttl: number
}

export const DefaultGeoServiceConfiguration: CatalogServiceConfiguration = {
  leader: null,
  isLeader: false,
  ttl: 600
}

export class ConfigurationHandler implements ConfigurationListener {
  current: CatalogServiceConfiguration = DefaultGeoServiceConfiguration
  
  isLeader(isLeader: boolean): CatalogServiceConfiguration {
    this.current = {
      isLeader: isLeader,
      leader: this.current.leader,
      ttl: this.current.ttl
    }
    return this.current
  }

  changedLeader(lider: string): CatalogServiceConfiguration {
    this.current = {
      isLeader: this.current.isLeader,
      leader: lider,
      ttl: this.current.ttl
    }
    return this.current
  }

  changedTTL(ttl: number): CatalogServiceConfiguration {
    this.current = {
      isLeader: this.current.isLeader,
      leader: this.current.leader,
      ttl: ttl
    }
    return this.current;
  }

  currentConfiguration(): CatalogServiceConfiguration {
    return this.current;
  }
}
