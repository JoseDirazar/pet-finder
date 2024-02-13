import Location from "@/components/location";
import { Card, CardContent } from "@/components/ui/card";
import PetCard from "@/components/ui/pet-card";
import db from "@/lib/prismadb";
import { auth } from "@/auth";
import { PostType } from "@/components/ui/pet-card";

export default async function Home({
  searchParams,
}: {
  searchParams: { city: string; state: string };
}) {
  const session = await auth();
  const localPosts = await db.pet.findMany({
    where: {
      city: searchParams.city,
    },
  }) as PostType[];
  if(!searchParams?.city) return null
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-y-2">
      <div>Hola {session?.user?.name}. Estas son las publicaciones de {searchParams.city}</div>
      <div>
        
        <div className="flex flex-col p-8">
          {localPosts.map((post) => (
            <PetCard data={post} key={post.id}/>
          ))}
        </div>
      </div>
    
    </main>
  );
}

/* currentUser::  _User {
  id: 'user_2bbd6uKeMurJfaqYKxqNGJcfv2y',
  passwordEnabled: false,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  banned: false,
  createdAt: 1706487540164,
  updatedAt: 1706490183175,
  imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yYmJkNnZIaTJsMUhFN0RGeldpYThuTnphRWUifQ',
  hasImage: true,
  gender: undefined,
  birthday: undefined,
  primaryEmailAddressId: 'idn_2bbd6gc08Uqz61Eza0SetVUKRRL',
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  lastSignInAt: 1706490183151,
  externalId: null,
  username: null,
  firstName: 'Jose',
  lastName: 'Dirazar',
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [
    _EmailAddress {
      id: 'idn_2bbd6gc08Uqz61Eza0SetVUKRRL',
      emailAddress: 'jfdirazar@gmail.com',
      verification: [_Verification],
      linkedTo: [Array]
    }
  ],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: [
    _ExternalAccount {
      id: 'idn_2bbd6hYUskGD2mTlOLeJkti6I7P',
      provider: undefined,
      identificationId: undefined,
      externalId: undefined,
      approvedScopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
      emailAddress: 'jfdirazar@gmail.com',
      firstName: undefined,
      lastName: undefined,
      imageUrl: undefined,
      username: null,
      publicMetadata: {},
      label: null,
      verification: [_Verification]
    }
  ],
  createOrganizationEnabled: true
} */

/* user::  {
  sessionClaims: null,
  sessionId: null,
  session: null,
  userId: null,
  user: null,
  actor: null,
  orgId: null,
  orgRole: null,
  orgSlug: null,
  orgPermissions: null,
  organization: null,
  getToken: [Function: getToken],
  has: [Function: has],
  debug: [Function (anonymous)], 
  protect: [Function (anonymous)]
}
currentUser::  null
user::  {
  actor: undefined,
  sessionClaims: {
    azp: 'http://localhost:3000',
    exp: 1706490615,
    iat: 1706490555,
    iss: 'https://helpful-pangolin-30.clerk.accounts.dev',
    nbf: 1706490545,
    sid: 'sess_2bbiT3k2Rvd7rzZIpb4CSBHZZpt',
    sub: 'user_2bbd6uKeMurJfaqYKxqNGJcfv2y'
  },
  sessionId: 'sess_2bbiT3k2Rvd7rzZIpb4CSBHZZpt',
  session: undefined,
  userId: 'user_2bbd6uKeMurJfaqYKxqNGJcfv2y',
  user: undefined,
  orgId: undefined,
  orgRole: undefined,
  orgSlug: undefined,
  orgPermissions: undefined,
  organization: undefined,
  getToken: [AsyncFunction (anonymous)],
  has: [Function (anonymous)],
  debug: [Function (anonymous)],
  protect: [Function (anonymous)]
} */
