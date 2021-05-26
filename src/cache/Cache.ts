import Memcached from 'memcached'

export default class Cache<V> {

  serverLocation = '1.1.1.1'
  ttl = 1
  memcached = new Memcached(this.serverLocation)

  store(k: string, v: V) {
    this.memcached.set(k, v, this.ttl, () => {
    })
  }

  get(k: string): Promise<V> {

    return new Promise((res, rej) => {
      this.memcached.get(k, function(err, data) {
        err && rej(err)
        res(data)
      })
    })
  }


}