"use server"

import { clerkClient } from '@clerk/nextjs/server'

interface Card{
    cardNo:string,
    expiry:string,
    cvv:number
}

interface Password{
    website:string,
    username:string,
    password:string
}

export async function addCardsServer(cardNo:string, expiry:string, cvv:number, userId:string) {

  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  let cards: Card[] = [];
  if(Array.isArray(user.privateMetadata.cards)){
    cards = user.privateMetadata.cards || [];
    cards.push({cardNo, expiry,cvv})

    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          cards: cards || [],
        },
      })
  } else{
    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          cards: [{cardNo, expiry,cvv}],
        },
      })
  }
}

export async function addPasswordServer(website:string, username:string, password:string, userId:string) {
  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  let passwords: Password[] = [];
  if(Array.isArray(user.privateMetadata.passwords)){
    passwords = user.privateMetadata.passwords || [];
    passwords.push({website,username,password})

    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            passwords: passwords || [],
        },
      })

  } else{
    // its not an array
    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            passwords: [{website,username,password}],
        },
      })
  }

  
}

export async function deleteCardServer(cardNo: string, userId: string) {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  let cards = user.privateMetadata.cards as any[];
  if (!Array.isArray(cards)) return;

  //filter the card we want to delete
  const updatedCards = cards.filter((card) => card.cardNo !== cardNo);
  // Update user's private metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: updatedCards,
    },
  });

}

export async function deletePasswordServer(website:string, userId:string) {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  let passwords = user.privateMetadata.passwords as any[];

  if (!Array.isArray(passwords)) return;

   //filter the passwords we want to delete
   const updatedPasswords = passwords.filter((password) => password.website !== website);
   // Update user's private metadata
   await client.users.updateUserMetadata(userId, {
     privateMetadata: {
       passwords: updatedPasswords,
     },
   });
}