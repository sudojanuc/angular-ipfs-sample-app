import { Component, OnInit } from '@angular/core';

import { IpfsService } from './services/ipfs.service';
import { Users, UserStorage, VaultBackupType } from '@spacehq/sdk';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  id = '';
  agentVersion = '';

  constructor(private readonly ipfsService: IpfsService) {}

  async ngOnInit(): Promise<void> {

    const users = new Users({ endpoint: 'wss://auth-dev.space.storage' });
    // createIdentity generate a random keypair identity
const identity = await users.createIdentity();

// the new keypair can be used to authenticate a new user
// `users.authenticate()` generates hub API session tokens for the keypair identity.
const user = await users.authenticate(identity);
// `user` can be used with the storage class to provide identity.

console.log('users: ', users);
console.log('identity: ', identity);
console.log('user: ', user);



// user's identity can also be backed up with a special recovery phrase
// const uuid = 'specify-uuid-representing-user-in-your-system';
// const passphrase = 'specify-unique-pass-phrase-related-to-backup-type';
// const backupType = VaultBackupType.Google;
// await users.backupKeysByPassphrase(uuid, passphrase, backupType, user.identity);

// // backed up users identity can also be recovered later
// const recoveredUser = await users.recoverKeysByPassphrase(uuid, passphrase, backupType);
// `recoveredUser` has same authentication as `user` above.




const storage = new UserStorage(user);

await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
// const result = await storage.listDirectory({ path: '' });
const uploadResponse = await storage.addItems({
  bucket: 'personal',
  files: [
    {
      path: 'file.txt',
      mimeType: 'txt',
      data: ''
    }
  ],
});



  //   await this.ipfsService.start();
  //   const node = this.ipfsService.getIpfs();
  //   const { id, agentVersion } = await node.id();
  //   this.id = id;
  //   this.agentVersion = agentVersion;

  //   // add
  //   const description = await node.add('Hello World.');

  //   console.log('LOG→ description: ', description);
  }
}
