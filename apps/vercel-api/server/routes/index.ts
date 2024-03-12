export default eventHandler((event) => {
  return new Response(`Hello from ${process.env.VERCEL_REGION ?? "local"}`);
});
