import { EntityBaseSchema } from "@modularcloud/ecs";

async function fetchLoad(props: any) {
  const response = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }/api/app/load`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    }
  );
  if(!response.ok) {
    console.log("Error loading entity", response)
    return null;
  }
  const entity = EntityBaseSchema.safeParse(await response.json());
  return entity.success ? entity.data : null;
}

export default async function HomePage(props: any) {
  const entity = await fetchLoad(props.params);
  console.log(entity);
  return <div>Home Page</div>;
}
