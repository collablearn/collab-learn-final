import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { supabase, isLogged, getSession }, }) => {
    const loginCheck = isLogged();

    console.log("AWW")
    if (loginCheck !== "has auth") redirect(302, "/");


};