import {Etcd3, Election} from 'etcd3'
import { ConfigurationListener } from '../services/CatalogService';
export class DiscoveryService {

    localIp: string;
    client: Etcd3;
    election: Election;
    hostPrefix = 'service/catalog/';
    configurationListener: ConfigurationListener;

    constructor(ip: string, configurationListener: ConfigurationListener) {
        this.localIp = ip;
        this.configurationListener = configurationListener
        this.client = new Etcd3({ hosts: ["http://etcd:2379", "http://127.0.0.1:2379"]});
        
        this.client.watch()
            .prefix(this.hostPrefix)
            .create()
            .then(watcher => {
                console.log('got watcher')
                watcher
                .on('disconnected', () => console.log('Disconnected'))
                .on('connected', () => console.log('Connected'))
                .on('put', res => console.log(res.key.toString(),' got set to:', res.value.toString()))
                .on('error', e => console.log(JSON.stringify(e)))
            });

        this.election = this.client.election('election/catalog');
    }

    async getLease(retry: number = 0) {

        const lease = this.client.lease(10); //TTL 10 secs

        lease.on('lost', err => {
            console.log('We lost our lease as a result of this error:', err);
            console.log('Trying to re-grant it...');
            if(retry > 3)
                this.getLease(retry + 1);
            else {
                console.error('no more')
            }
        })

        await lease.put(this.hostPrefix + this.localIp).value(this.localIp);
    }

    async getHosts() {
        const keys = await this.client.getAll().prefix(this.hostPrefix).keys();
        return keys.map(key => key.slice(this.hostPrefix.length));
    }


    runCampaign() {
        const campaign = this.election.campaign(this.localIp)
        campaign.on('elected', () => {
            // This server is now the leader! Let's start doing work
            this.configurationListener.isLeader(true)
        });
        campaign.on('error', error => {
            // An error happened that caused our campaign to fail. If we were the
            // leader, make sure to stop doing work (another server is the leader
            // now) and create a new campaign.
            console.error(error);
            this.configurationListener.isLeader(false) // nullable?
            setTimeout(this.runCampaign, 5000);
        });
    }

    async observeLeader() {
        const observer = await this.election.observe();
        console.log('The current leader is', observer.leader());
        observer.on('change', leader => {
            this.configurationListener.changedLeader(leader)
            console.log('The new leader is', leader)
        }
            );
        observer.on('error', () => {
            // Something happened that fatally interrupted observation.
            setTimeout(this.observeLeader, 5000);
        });
    }

}