import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	const { name, email, message } = await request.json();
	if (!name || !email || !message) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
	return new Response(JSON.stringify({ error: "Email not configured" }), { status: 500 });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
