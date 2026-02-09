exports.handler = async function () {

  const SPACE_ID = "09muo917z9ra";
  const ACCESS_TOKEN = "Z2-ybwP2VOWRp1wNWpxaaAl0P8sekgACZD-QXYDFrdw";

  const res = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=blogPost`
  );

  const data = await res.json();

  const baseUrl = "https://calmingcurrentsbeautyspa.com";

  const staticPages = [
    "",
    "/services.html",
    "/gallery.html",
    "/about.html",
    "/contact.html",
    "/blog.html"
  ];

  let urls = "";

  /* Static pages */
  staticPages.forEach(page => {
    urls += `
      <url>
        <loc>${baseUrl}${page}</loc>
      </url>`;
  });

  /* Blog posts */
  data.items.forEach(item => {
    urls += `
      <url>
        <loc>${baseUrl}/post.html?slug=${item.fields.slug}</loc>
        <lastmod>${item.fields.publishedDate}</lastmod>
      </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml"
    },
    body: sitemap
  };
};
