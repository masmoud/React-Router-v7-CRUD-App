import { Form, redirect } from "react-router";
import { supabase } from "~/supabase-client";
import type { Route } from "./+types/newItem";

export function meta() {
  return [
    { title: "New Item | RRV7 Crud" },
    {
      name: "description",
      content: "Create a new item using Supabase CRUD app.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const fd = await request.formData();

  const title = fd.get("title") as string;
  const description = fd.get("description") as string;

  if (!title || title.trim() === "" || !description || description.trim() === "") {
    return { error: "Title and description are required" };
  }

  console.log(title);
  console.log(description);

  const { error } = await supabase.from("items").insert({ title, description });

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
}

const NewItem = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            name="title"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            name="description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
          Create Item
        </button>
      </Form>
    </div>
  );
};
export default NewItem;
