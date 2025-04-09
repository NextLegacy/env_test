import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";
import { route } from "$lib/utils/routes";
import { fail, redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (!event.locals.user) {
        return redirect(302, route("/user/login"));
    }
    await invalidateSession("1");
    deleteSessionTokenCookie(event);
    return { user: event.locals.user };
};

export const actions = {
    logout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }

        return redirect(302, route("/user/login"));
    }
};
