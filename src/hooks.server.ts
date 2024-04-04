
import { createServerClient } from '@supabase/ssr'
import type { Session } from '@supabase/supabase-js';
import { redirect, type Handle } from '@sveltejs/kit'

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve }) => {

    const { cookies } = event;

    event.locals.isLogged = async () => {
        const { data: { user }, error: getUserError } = await event.locals.supabase.auth.getUser();
        if (user) return user;
        else if (getUserError) return null;
        else return null;
    }

    event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),

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

    event.locals.safeGetSession = async () => {
        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return { session, user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}