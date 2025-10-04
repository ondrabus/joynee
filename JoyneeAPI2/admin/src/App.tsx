import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { 
  UserList, 
  UserEdit, 
  UserCreate, 
  UserShow 
} from './resources/users';
import { 
  HashtagList, 
  HashtagEdit, 
  HashtagCreate, 
  HashtagShow 
} from './resources/hashtags';
import { 
  BubbleList, 
  BubbleEdit, 
  BubbleCreate, 
  BubbleShow 
} from './resources/bubbles';
import { 
  AccountList, 
  AccountEdit, 
  AccountCreate, 
  AccountShow 
} from './resources/accounts';
import { 
  UserPlaceholderList, 
  UserPlaceholderEdit, 
  UserPlaceholderCreate, 
  UserPlaceholderShow 
} from './resources/userPlaceholders';
import { 
  UserSettingsList, 
  UserSettingsEdit, 
  UserSettingsCreate, 
  UserSettingsShow 
} from './resources/userSettings';
import { 
  UserPhotoList, 
  UserPhotoEdit, 
  UserPhotoCreate, 
  UserPhotoShow 
} from './resources/userPhotos';
import { 
  UserBubbleSubscriptionList, 
  UserBubbleSubscriptionEdit, 
  UserBubbleSubscriptionCreate, 
  UserBubbleSubscriptionShow 
} from './resources/userBubbleSubscriptions';

import {
  People as PeopleIcon,
  LocalOffer as HashtagIcon,
  BubbleChart as BubbleIcon,
  AccountBalance as AccountIcon,
  PersonAdd as UserPlaceholderIcon,
  Settings as SettingsIcon,
  PhotoCamera as PhotoIcon,
  Subscriptions as SubscriptionIcon,
} from '@mui/icons-material';
import { authProvider } from './authProvider';

const App: React.FC = () => {
  return (
    <Admin 
      dataProvider={dataProvider} 
      authProvider={authProvider}
      title="Joynee Admin Portal"
    >
      <Resource 
        name="users" 
        list={UserList} 
        edit={UserEdit} 
        create={UserCreate} 
        show={UserShow}
        icon={PeopleIcon}
      />
      <Resource 
        name="hashtags" 
        list={HashtagList} 
        edit={HashtagEdit} 
        create={HashtagCreate} 
        show={HashtagShow}
        icon={HashtagIcon}
      />
      <Resource 
        name="bubbles" 
        list={BubbleList} 
        edit={BubbleEdit} 
        create={BubbleCreate} 
        show={BubbleShow}
        icon={BubbleIcon}
      />
      <Resource 
        name="accounts" 
        list={AccountList} 
        edit={AccountEdit} 
        create={AccountCreate} 
        show={AccountShow}
        icon={AccountIcon}
      />
      <Resource 
        name="user-placeholders" 
        list={UserPlaceholderList} 
        edit={UserPlaceholderEdit} 
        create={UserPlaceholderCreate} 
        show={UserPlaceholderShow}
        icon={UserPlaceholderIcon}
      />
      <Resource 
        name="user-settings" 
        list={UserSettingsList} 
        edit={UserSettingsEdit} 
        create={UserSettingsCreate} 
        show={UserSettingsShow}
        icon={SettingsIcon}
      />
      <Resource 
        name="user-photos" 
        list={UserPhotoList} 
        edit={UserPhotoEdit} 
        create={UserPhotoCreate} 
        show={UserPhotoShow}
        icon={PhotoIcon}
      />
      <Resource 
        name="user-bubble-subscriptions" 
        list={UserBubbleSubscriptionList} 
        edit={UserBubbleSubscriptionEdit} 
        create={UserBubbleSubscriptionCreate} 
        show={UserBubbleSubscriptionShow}
        icon={SubscriptionIcon}
      />
    </Admin>
  );
};

export default App;
