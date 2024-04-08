
import { createServerClient } from '@supabase/ssr'
import type { Session } from '@supabase/supabase-js';
import { redirect, type Handle } from '@sveltejs/kit'
import sharp from 'sharp';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve }) => {

    const { cookies } = event;

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

    event.locals.compressImage = async (fileObject: File, targetSizeKB = 300) => {
        const maxQuality = 100; // Maximum JPEG/PNG quality (for resizing)
        const inputImageBuffer = await fileObject.arrayBuffer();

        let quality = maxQuality;
        let outputBuffer = null;

        // Adjust image quality dynamically to achieve target size
        while (quality > 0) {
            try {
                // Resize and compress the image with the current quality setting
                outputBuffer = await sharp(Buffer.from(inputImageBuffer))
                    .resize({ width: 300, height: 300 }) // Resize if needed
                    .png({ quality: quality }) // Set PNG quality
                    .toBuffer();

                // Check the size of the output image
                const outputSizeKB = outputBuffer.length / 1024;

                // Check if the output size is within the target range
                if (outputSizeKB <= targetSizeKB) {
                    break; // Stop compression if target size is achieved
                }

                // Reduce quality for the next iteration
                quality -= 5; // Adjust quality reduction step
            } catch (error) {
                console.error('Error compressing image:', error);
                return null; // Return null on error
            }
        }

        if (outputBuffer) {
            const blob = new Blob([outputBuffer], { type: "image/png" });
            return blob
        }

        return null; // Return the compressed image buffer
    }


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