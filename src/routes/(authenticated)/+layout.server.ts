import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { supabase, isLogged }, }) => {
    const loginCheck = isLogged();

    if (loginCheck !== "has auth") redirect(302, "/");

};