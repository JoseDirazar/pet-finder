import { NextResponse } from "next/server";
import db from "@/lib/prismadb";
import type { UserWebhookEvent } from "@clerk/clerk-sdk-node";

export async function POST(req: Request) {
  try {
    const request: UserWebhookEvent = await req.json();

    if (request.type === "user.created") {
      const userExist = await db.user.findFirst({
          where: {
              email: request.data.email_addresses[0].email_address
          }
      })

      if(userExist) return new NextResponse('Ya existe el usuario', {status: 501})

      await db.user.create({
        data: {
          user_id: request.data.id,
          first_name: request.data.first_name,
          last_name: request.data.last_name,
          image: request.data.image_url,
          email: request.data.email_addresses[0].email_address,
        },
      });
     
    }
    return new NextResponse("Usuario creado", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Algo salio mal.", { status: 501 });
  }
}

/* {
  data: {
    backup_code_enabled: false,
    banned: false,
    create_organization_enabled: true,
    created_at: 1706500455300,
    delete_self_enabled: true,
    email_addresses: [ [Object] ],
    external_accounts: [ [Object] ],
    external_id: null,
    first_name: 'Jose',
    has_image: true,
    id: 'user_2bc3I18txzEydhmCPpm2ZgCr8d6',
    image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yYmMzSTBIWGpYcVVyc3N3ZUEzNWl6RjQydnUifQ',
    last_active_at: 1706500455298,
    last_name: 'Dirazar',
    last_sign_in_at: null,
    locked: false,
    lockout_expires_in_seconds: null,
    object: 'user',
    password_enabled: false,
    phone_numbers: [],
    primary_email_address_id: 'idn_2bc3Hxt6cJ6JNYQTXHfZeB6BWgO',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://images.clerk.dev/oauth_google/img_2bc3I0HXjXqUrssweA35izF42vu',
    public_metadata: {},
    saml_accounts: [],
    totp_enabled: false,
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 1706500455343,
    username: null,
    verification_attempts_remaining: 100,
    web3_wallets: []
  },
  object: 'event',
  type: 'user.created'
} */
