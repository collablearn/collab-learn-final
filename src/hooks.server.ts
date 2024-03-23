
import { createServerClient } from '@supabase/ssr'
import type { Session } from '@supabase/supabase-js';
import { redirect, type Handle } from '@sveltejs/kit'

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve }) => {

    const { cookies } = event;

    event.locals.isLogged = () => {
        if (cookies) {
            try {
                const session: Session = JSON.parse(cookies.get("sb-climcdnnyuyrfcyxhewr-auth-token") as string);

                if (session) {
                    return "has auth"
                } else {
                    return "no auth"
                }
            } catch (error) {
                return "no proper cookies"
            }
        } else return "no cookies detected"
    }

    event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            /**
             * Note: You have to add the `path` variable to the
             * set and remove method due to sveltekit's cookie API
             * requiring this to be set, setting the path to an empty string
             * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
             */
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })


    event.locals.supabaseAdmin = createServerClient(supabaseURL, supabaseAdminKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            /**
             * Note: You have to add the `path` variable to the
             * set and remove method due to sveltekit's cookie API
             * requiring this to be set, setting the path to an empty string
             * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
             */
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}