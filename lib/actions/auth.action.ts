'use server';

import {auth, db} from "@/firebase/admin";
import {cookies} from "next/headers";

const ONE_WEEK = 60 * 60 * 24 *7;

export async function signUp(params:SignUpParams){
    const {uid, name, email} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return{
                success: false,
                message: 'User already exists!'
            }
        }

        await  db.collection('users').doc(uid).set({
            name, email
        })

        return{
            success:true,
            message: "User created Succcessfully. Please Sign In"
        }
    }catch (e:any) {
        console.error("Error crating user ", e);

        if(e.code === 'auth/email-already-exists'){
            return{
                success:false,
                message:"Email already in use"
            }
        }

        return {
            success:false,
            message:"Failed to create an account"
        }
    }
}

export async function signIn(params:SignInParams){
    const {email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message: 'User Does Not Exist! Create an account'
            }
        }
        await setSessionCookie(idToken);

    }catch (e) {
        console.error(e);
        return {
            success: false,
            message: "Failed to log in to account"
        }
    }
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure : process.env.NODE_ENV === 'production',
        path: '/',
        sameSite:'lax'
    })
}

export async function getCurrentUser (): Promise<User | null>{
    const cookieStore = await cookies();

    const sessionCookies = cookieStore.get('session')?.value;

    if(!sessionCookies) return null;

    try{
        const decodedClaim = await auth.verifySessionCookie(sessionCookies,true);
        const userRecord = await db.collection('users').doc(decodedClaim.uid).get();

        if(!userRecord) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,

        }as User;
    }catch (e){
        console.error(e);

        return null;
    }

}

export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
}