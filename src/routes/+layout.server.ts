import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    console.log("INVALIDATED")
    return {
        session: await getSession(),
    }
}